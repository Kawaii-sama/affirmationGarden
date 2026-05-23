const express = require("express");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy"
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;