const mongoose = require("mongoose");

const affirmationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Affirmation = mongoose.model(
  "Affirmation",
  affirmationSchema
);

module.exports = Affirmation;