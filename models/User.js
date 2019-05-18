const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  // initializing the value to be zero
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
