const CustomError = require("../error/CustomError");
const { sendEmailCWU, sendEmailWWU } = require("../utils/email");

const contactwithusService = async ({ information }) => {
  sendEmailCWU(
    `${information.sender}`,
    `${information.email}`,
    `${information.subject}`,
    `${information.phoneNumber}`,
    `${information.content}`
  );

  return { success: true, data: { information } };
};

const workwithusService = async ({ information }) => {
  sendEmailWWU(
    information.firstname,
    information.lastname,
    information.email,
    information.phone,
    information.country,
    information.adress,
    information.position,
    information.additionalInfo,
    information.file
  );
  return { success: true };
};

const denemeService = async (file) => {
  file.mv("./uploads/" + file.name, function (err, result) {
    if (err) throw err;
    return { success: true };
  });
};

module.exports = {
  contactwithusService,
  workwithusService,
  denemeService,
};
