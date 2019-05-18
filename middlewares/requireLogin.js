// a case-specific middleware that checks if users are loggeed in
module.exports = (req, res, next) => {
  // check if the user is logged in
  if (!req.user) {
    return res.status(401).send({ error: "you must log in!" });
  }
  // next means that go into the next middleware in the chain
  next();
};
