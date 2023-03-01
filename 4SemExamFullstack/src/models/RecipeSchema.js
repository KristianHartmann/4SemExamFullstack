const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guide: { type: String, required: true },
  time: { type: Number, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
  image: { type: String },
  ratings: [{ type: Number }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;