const express = require("express");
const ContactController = require("../controllers/Contact.controller");
const contactRouter = express.Router();

contactRouter.route("/contactwithus").post(ContactController.contactwithus);
contactRouter.route("/workwithus").post(ContactController.workwithus);
contactRouter.route("/deneme").post(ContactController.deneme);

module.exports.contactRouter = contactRouter;
