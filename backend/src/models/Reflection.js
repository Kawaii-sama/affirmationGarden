const mongoose = require("mongoose");

const reflectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    category: {
      type: String,
      required: true
    },

    affirmation: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Reflection = mongoose.model(
  "Reflection",
  reflectionSchema
);

module.exports = Reflection;