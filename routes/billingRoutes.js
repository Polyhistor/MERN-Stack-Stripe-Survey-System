const keys = require("../config/keys");
// the stripe official module for NODE that takes our Stripe secret key as the second invocation argument
const stripe = require("stripe")(keys.stripeSecretKey);
// our case-specific middleware
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // you can have a case-specific middleware by adding it as a second argument in your route handler
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // built-in method to handle charges
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "5$ for 5 credits",
      // what charge source we are attempting to bill, we are billing what transaction?
      source: req.body.id
    });
    // accessing the user by PassportJS
    req.user.credits += 5;
    // persisting the new data
    const updatedUser = await req.user.save();
    // now let's send the response
    res.send(updatedUser);
  });
};
