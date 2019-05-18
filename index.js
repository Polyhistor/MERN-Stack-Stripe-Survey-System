// library calls
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// create an app
const app = express();

// trying to exert the body-parser middleware to parse the request payload
// with this code, this middleware will automatically parse the body and assign it to req.body of the incoming request
app.use(bodyParser.json());

// using cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// use our cookie hashing
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // making sure that express will serve up our product assets such as main.js and main.css file
  app.use(express.static("client/build"));

  //express will serve up index.html file if doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
