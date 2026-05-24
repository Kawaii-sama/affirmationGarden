const express = require("express");
const cors = require("cors"); 


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "🌱 Server is healthy 🌱"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});


module.exports = app;