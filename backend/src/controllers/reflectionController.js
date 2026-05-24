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

    // --- Streak calculation ---
    const user = await User.findById(req.userId);

    // Get yesterday's date range
    const startOfYesterday = new Date();
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    startOfYesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date();
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);
    endOfYesterday.setHours(23, 59, 59, 999);

    // Check if user submitted a reflection yesterday
    const yesterdayReflection = await Reflection.findOne({
      user: req.userId,
      createdAt: { $gte: startOfYesterday, $lte: endOfYesterday }
    });

    // If they did yesterday, continue the streak
    // If they didn't, reset streak to 1
    const newStreak = yesterdayReflection ? user.streak + 1 : 1;

    // Update user stats
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $inc: { completedDays: 1, gardenStage: 1 },
        streak: newStreak
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Reflection saved 🌱",
      reflection,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        streak: updatedUser.streak,
        completedDays: updatedUser.completedDays,
        gardenStage: updatedUser.gardenStage
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