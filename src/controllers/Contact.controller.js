const expressAsyncHandler = require("express-async-handler");
const { contactwithusService } = require("../services/contact.services");

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
}

module.exports = ContactController;
