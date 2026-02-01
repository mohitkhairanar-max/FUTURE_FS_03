const nodemailer = require("nodemailer");

async function sendLeadEmail({ name, phone, message }) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 465),
    secure: String(process.env.MAIL_SECURE || "true") === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const to = process.env.LEADS_TO_EMAIL || process.env.MAIL_USER;

  const subject = `New Lead — LC FITNESS (${name})`;

  const text =
`LC FITNESS - New Lead

Name: ${name}
Phone: ${phone}

Message:
 ${message}
`;

  await transporter.sendMail({
    from: `"LC FITNESS Website" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
  });
}

module.exports = { sendLeadEmail };
