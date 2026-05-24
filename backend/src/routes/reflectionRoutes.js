const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { submitReflection } = require("../controllers/reflectionController");

// POST /api/reflections — protected route
router.post("/", protect, submitReflection);

module.exports = router;