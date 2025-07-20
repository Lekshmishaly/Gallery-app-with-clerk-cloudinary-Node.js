const sendResponse = (res, status, data, message) => {
  res.status(status).json({
    status: status < 400 ? "success" : "error",
    data,
    message,
  });
};

module.exports = sendResponse;
