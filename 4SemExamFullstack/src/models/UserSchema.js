const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  shoppingLists: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ShoppingList" },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
