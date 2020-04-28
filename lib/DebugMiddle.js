const DebugMiddleware = (req, res, next) => {
  console.log(res.path);
  next();
};

module.exports = DebugMiddleware;