const nodemailer = require('nodemailer')
const sendMail = async (options)=> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      const mailOptions ={
        from : process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text:options.message,
      };

      const info = await transporter.sendMail(mailOptions);
    //   console.log("message sent"+ info.messageId);
      
};

module.exports = sendMail;