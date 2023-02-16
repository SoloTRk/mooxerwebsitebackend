const express = require("express");
const ErrorHandler = require("../error/ErrorHandler");
const { contactRouter } = require("./contact.router");

const indexRouter = express.Router();

indexRouter.use("/", contactRouter);
indexRouter.use(ErrorHandler);

module.exports.indexRouter = indexRouter;
