const express = require("express");

const app = express();

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy"
  });
});

module.exports = app;