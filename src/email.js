const nodemailer = require("nodemailer");
const ejs = require("ejs");
const CustomError = require("./error/CustomError");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cango190521@gmail.com",
    pass: "ufdtyiwoslqjfnnv",
  },
});

const sendEmail = (sender, email, subject, phoneNumber, content) => {
  if (sender === "")
    throw new CustomError(400, "Please check your name/surname!");

  if (email === "")
    throw new CustomError(400, "Please check your email address!");

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (emailRegex.test(email)) {
  } else {
    throw new CustomError(400, "Email not matching");
  }

  if (subject === "") throw new CustomError(400, "Please check your subject!");

  if (phoneNumber === "")
    throw new CustomError(400, "Please check your phone number!");

  const phoneRegex =
    /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g;

  if (phoneRegex.test(phoneNumber)) {
  } else {
    console.log("here");
    throw new CustomError(400, "Phone number not matching");
  }

  if (content === "") throw new CustomError(400, "Please check your content!");

  ejs.renderFile(
    __dirname + "/templates/welcome.ejs",
    { sender, email, subject, phoneNumber, content },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: sender,
          to: "cango190521@gmail.com",
          subject: subject,
          html: data,
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      }
    }
  );
};

module.exports = {
  sendEmail,
};
