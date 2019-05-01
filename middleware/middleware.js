const jwt = require('jsonwebtoken');
const secret = `${process.env.JWT_SECRET}`;
const withAuth = function(req, res, next) {
    console.log("works");
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.userData = {
            name: decoded.name,
            userId: decoded.userId
        }
        next();
      }
    });
  }
}
module.exports = withAuth;