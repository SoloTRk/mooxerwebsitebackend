const CustomError = require("../error/CustomError");
const { sendEmail } = require("../email");

const contactwithusService = async ({ information }) => {
  sendEmail(
    `${information.sender}`,
    `${information.email}`,
    `${information.subject}`,
    `${information.phoneNumber}`,
    `${information.content}`
  );

  return { success: true, data: { information } };
};

module.exports = {
  contactwithusService,
};
