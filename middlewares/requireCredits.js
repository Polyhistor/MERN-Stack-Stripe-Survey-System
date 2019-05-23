// a case-specific middleware that checks if users has enough credits
module.exports = (req, res, next) => {
  // check if the user has enough credits
  if (req.user.credits < 1) {
    return res.status(401).send({ error: "Not enough credits!" });
  }
  // next means that go into the next middleware in the chain
  next();
};
