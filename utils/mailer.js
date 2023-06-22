const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");

require("dotenv/config");

exports.sendMail = (to, subject, htmlContext) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.MAIL_HOST,
    port: mailConfig.MAIL_POST,
    secure: true,
    auth: {
      user: mailConfig.MAIL_USERNAME, //Tài khoản gmail vừa tạo
      pass: mailConfig.MAIL_PASSWORD, //Mật khẩu ung dung tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  var options = {
    // thiết lập đối tượng, nội dung gửi mail
    from: mailConfig.MAIL_FROM_ADDRESS,
    to: to,
    subject: subject,
    //   text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    html: htmlContext, //Nội dung html mình đã tạo trên kia :))
  };
  return transporter.sendMail(options)
};
