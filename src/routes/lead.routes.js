const express = require("express");
const router = express.Router();

const { createLead } = require("../controllers/lead.controller");
const { leadRateLimit } = require("../middleware/rateLimit");
const { validateLead } = require("../middleware/validate");

router.post("/", leadRateLimit, validateLead, createLead);

module.exports = router;
