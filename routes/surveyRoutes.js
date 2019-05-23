const mongoose = require("mongoose");
const rquireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Path = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");

// taking certain model out of the mongoose model, this is an object class that you can use as a blue print to create
// and presist data
const Survey = mongoose.model("surveys");

module.exports = app => {
  // send back the list of revelant surveys
  app.get("/api/surveys", rquireLogin, async (req, res) => {
    // the select demarcates the query, it's called query protection
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("thanks for voting!");
  });

  // preprocessing logics to handle all the incoming urls from sendGrid
  app.post("api/surveys/webhooks", (req, res) => {
    // the path is anything after the domain name and the port
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(event => {
        // extracting special parts of the URL
        const match = p.test(new URL(event.url).pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // | #1 compact function takes an array, goes into and remove all undefined elements
      .compact()
      // | #2 uniqBy function removes duplication
      .uniqBy("email", "surveyId")

      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            // this will search for inner document
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // $inc stands for increment! and $set, is setting a new value, a dollar sign makes mongo understand inner collections
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
            // exec will execute the query
          }
        ).exec();
      })
      // | #3 pull out the final array
      .value();
  });

  app.post("/api/surveys", rquireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      // from es6 onwards, if your key and value pairs are the same, you can just write one! however I don't do that
      // because some other engineers maybe terribly confused by looking at it.
      title: title,
      subject: subject,
      body: body,
      // we are taking a comma separated list of emails, splitting each, and creating an array of objects out of it
      recipients: recipients.split(",").map(email => {
        return { email: email };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      //422 is unprocessable identity
      res.status(422).send(err);
    }
  });
};
