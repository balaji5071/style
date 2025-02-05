const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skinTone: { type: String },
  bodyStructure: { type: String },
  favoriteColors: { type: [String] },
});

module.exports = mongoose.model("User", UserSchema);
