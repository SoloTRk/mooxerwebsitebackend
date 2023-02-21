const nodemailer = require("nodemailer");
const ejs = require("ejs");
const CustomError = require("../error/CustomError");
const { dirname } = require("path");
const { hashCode } = require("./hashing/hashCode");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testf426@gmail.com", // MOOXER mail adress
    pass: "hkxcffozqcodxvid",
  },
});

const sendEmailCWU = (sender, email, subject, phoneNumber, content) => {
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
    throw new CustomError(400, "Phone number not matching");
  }

  if (content === "") throw new CustomError(400, "Please check your content!");

  ejs.renderFile(
    __dirname + "/templates/contactwithus.ejs",
    { sender, email, subject, phoneNumber, content },
    (err, data) => {
      if (err) {
      } else {
        var mailOptions = {
          from: sender,
          to: "testf426@gmail.com", // MOOXER mail adress
          subject: subject,
          html: data,
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
          }
        });
      }
    }
  );
};

const sendEmailWWU = (
  firstname,
  lastname,
  email,
  phone,
  country,
  adress,
  position,
  additionalInfo,
  file
) => {
  if (firstname === "") throw new CustomError(400, "Please check your name!");

  if (lastname === "")
    throw new CustomError(400, "Please check your lastname!");

  if (email === "")
    throw new CustomError(400, "Please check your email address!");

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (emailRegex.test(email)) {
  } else {
    throw new CustomError(400, "Email not matching");
  }

  if (phone === "")
    throw new CustomError(400, "Please check your phone number!");

  const phoneRegex =
    /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g;

  if (phoneRegex.test(phone)) {
  } else {
    throw new CustomError(400, "Phone number not matching");
  }

  if (country === "") throw new CustomError(400, "Please check your country!");

  if (adress === "") throw new CustomError(400, "Please check your adress!");

  if (position === "")
    throw new CustomError(400, "Please check your position!");

  if (additionalInfo === "")
    throw new CustomError(400, "Please check your additionalInfo!");

  if (file === "")
    throw new CustomError(400, "Please check your additionalInfo!");

  if (file.mimetype !== "application/pdf")
    throw new CustomError(400, "Please enter cv in correct format");

  file.mv(
    "./src/public/uploads/" + file.name.hashCode() + ".pdf",
    function (err, result) {
      if (err) throw err;
    }
  );
  const filename = file.name.hashCode();
  const PORT = process.env.PORT;
  ejs.renderFile(
    __dirname + "/templates/workwithus.ejs",
    {
      firstname,
      lastname,
      email,
      phone,
      country,
      adress,
      position,
      additionalInfo,
      filename,
      BASE_URL: `http://localhost:${PORT}`,
    },
    (err, data) => {
      if (err) {
      } else {
        var mailOptions = {
          from: `${email}`,
          to: "testf426@gmail.com", // MOOXER mail address
          subject: additionalInfo,
          html: data,
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
          }
        });
      }
    }
  );
};

module.exports = {
  sendEmailCWU,
  sendEmailWWU,
};
