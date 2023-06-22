module.exports = function (req, res, next) {
  if (req.signedCookies.sessionId) {
    res.cookie("sessionId", 12345, {
      signed: true,
    });
  }
  next();
};
