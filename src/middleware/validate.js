function isValidPhone(phone) {
  return typeof phone === "string" && phone.trim().length >= 7 && phone.trim().length <= 20;
}

function sanitize(str) {
  return String(str || "").replace(/[<>]/g, "").trim();
}

function validateLead(req, res, next) {
  const name = sanitize(req.body.name);
  const phone = sanitize(req.body.phone);
  const message = sanitize(req.body.message);

  if (!name || name.length < 2) {
    return res.status(400).json({ ok: false, message: "Name is required." });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ ok: false, message: "Phone is invalid." });
  }
  if (!message || message.length < 5) {
    return res.status(400).json({ ok: false, message: "Message is required." });
  }

  req.body = { name, phone, message };
  next();
}

module.exports = { validateLead };
