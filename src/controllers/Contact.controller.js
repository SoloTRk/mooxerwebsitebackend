const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");

const {
  contactwithusService,
  workwithusService,
  denemeService,
} = require("../services/contact.services");

class ContactController {
  static contactwithus = expressAsyncHandler(async (req, res) => {
    const { sender, email, subject, phoneNumber, content } = req.body;
    const information = {
      sender,
      email,
      subject,
      phoneNumber,
      content,
    };

    const response = await contactwithusService({ information });

    res.json(response);
  });

  static workwithus = expressAsyncHandler(async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      country,
      adress,
      position,
      additionalInfo,
    } = req.body;

    const file = req.files.cv;

    const information = {
      firstname,
      lastname,
      email,
      phone,
      country,
      adress,
      position,
      additionalInfo,
      file,
    };

    const response = await workwithusService({ information });

    res.json("response");
  });

  static deneme = expressAsyncHandler(async (req, res) => {
    const file = req.files.cv;
    const response = await denemeService(file);

    res.json(response);
  });
}

module.exports = ContactController;
