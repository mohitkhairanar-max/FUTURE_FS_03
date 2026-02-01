const buckets = new Map();

function leadRateLimit(req, res, next) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const max = 5;

  const entry = buckets.get(ip) || { count: 0, start: now };

  if (now - entry.start > windowMs) {
    buckets.set(ip, { count: 1, start: now });
    return next();
  }

  if (entry.count >= max) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please try again shortly." });
  }

  entry.count += 1;
  buckets.set(ip, entry);
  next();
}

module.exports = { leadRateLimit };
