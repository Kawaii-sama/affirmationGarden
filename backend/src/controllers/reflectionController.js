const Reflection = require("../models/Reflection");
const User = require("../models/User");

const submitReflection = async (req, res) => {
  try {
    const { category, affirmation } = req.body;

    // Basic validation
    if (!category || !affirmation) {
      return res.status(400).json({
        success: false,
        message: "Please provide category and affirmation"
      });
    }

    // Check if user already submitted a reflection today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingReflection = await Reflection.findOne({
      user: req.userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingReflection) {
      return res.status(400).json({
        success: false,
        message: "You have already completed today's reflection 🌱"
      });
    }

    // Save the reflection
    const reflection = await Reflection.create({
      user: req.userId,
      category,
      affirmation
    });

    // Update user's completedDays and gardenStage
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $inc: {
          completedDays: 1,
          gardenStage: 1
        }
      },
      { new: true }  // returns the updated user
    );

    res.status(201).json({
      success: true,
      message: "Reflection saved 🌱",
      reflection,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        streak: user.streak,
        completedDays: user.completedDays,
        gardenStage: user.gardenStage
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { submitReflection };