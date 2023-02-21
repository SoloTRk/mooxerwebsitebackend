module.exports = (err, req, res, next) => {
  // Custom errors
  if (err.status < 1000) {
    res.status(err.status).json({ status: err.status, message: err.message });
  }
  // mongoo errors
  else if (err.code == 11000) {
    res.status(400).json({ status: 400, message: "EMAIL_ALREADY_REGISTERED" });
  } else if (err.name == "CastError") {
    res.status(400).json({ status: 400, message: "INCORRECT_USER_ID_FORMAT" });
  }
  // server errors
  else {
    res.status(500).json({ status: 500, message: "something went wrong" });
  }
};
