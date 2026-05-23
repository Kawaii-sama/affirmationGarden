const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  streak: {
    type: Number,
    default: 0
  },

  completedDays: {
    type: Number,
    default: 0
  },

  gardenStage: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;