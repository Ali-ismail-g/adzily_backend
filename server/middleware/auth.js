const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let authHeader = req.get("x-access-token");
  if (!authHeader) {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const decodedToken = jwt.verify(token, process.env.secretOrPrivateKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    next();
  });
};