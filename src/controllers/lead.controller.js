const { sendLeadEmail } = require("../services/mail.service");

async function createLead(req, res) {
  try {
    const { name, phone, message } = req.body;

    await sendLeadEmail({ name, phone, message });

    return res.json({
      ok: true,
      message: "Thanks! Your request has been received. We'll contact you shortly.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong while submitting. Please try again later.",
    });
  }
}

module.exports = { createLead };
