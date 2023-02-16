const express = require("express");
const ContactController = require("../controllers/Contact.controller");
const contactRouter = express.Router();

contactRouter.route("/contactwithus").post(ContactController.contactwithus);

module.exports.contactRouter = contactRouter;
