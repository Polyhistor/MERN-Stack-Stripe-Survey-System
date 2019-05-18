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
  app.get(
    "/auth/google/callback",
    // this middleware will authenticate the user with google
    passport.authenticate("google"),
    // after the authentication is done, we have to redirect the user
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // logout route
  app.get("/api/logout", (req, res) => {
    // passport automatically destroys the cookie
    req.logout();
    // we are redirecting the user
    res.redirect("/surveys");
  });

  // Use the cookie, deseralize, get the id, make user model, give us the user!
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
