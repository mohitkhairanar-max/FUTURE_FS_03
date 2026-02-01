const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./src/routes/lead.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
      origin: process.env.ALLOWED_ORIGIN || "*",
    })
);

// Body parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/leads", leadRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, name: "LC FITNESS API" });
});

// SPA fallback (so direct URL loads index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`LC FITNESS running at http://localhost:${PORT}`);
});
