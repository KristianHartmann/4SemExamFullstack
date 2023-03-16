const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  recipeIngredients: [
    {
      recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
      ingredients: [
        {
          name: {
            type: String,
            required: true,
          },
          amount: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
