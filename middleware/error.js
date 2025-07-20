const sendResponse = require("../utils/response");

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  sendResponse(res, status, null, message);
};

module.exports = errorMiddleware;
