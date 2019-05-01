const passport = require("passport");

module.exports = app => {
  // router handler for the authentication
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  // this time we have received the code from google, and we are getting the scopes
  app.get("/auth/google/callback", passport.authenticate("google"));

  // logout route
  app.get("/api/logout", (req, res) => {
    // passport automatically destroys the cookie
    req.logout();
    // we are sending back the username that requested
    res.send(req.user);
  });

  // Use the cookie, deseralize, get the id, make user model, give us the user!
  app.get("/api/current_user", (req, res) => {
    res.send(req.session)
    res.send(req.user);
  });
};
