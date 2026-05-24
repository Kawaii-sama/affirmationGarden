const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // This is what our controllers will use to know who is logged in
    req.userId = decoded.userId;

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, invalid token"
    });
  }
};

module.exports = protect;