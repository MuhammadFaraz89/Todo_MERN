const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  // user can select either Admin or Student, by default its student
  role: { type: String, enum: ["Admin", "Student"], default: "Student" },
});     

// database Structure: Database name > Collection > Docs
// User is the collection name and UserSchema defines the design(Meta Data) of the Collection (User)

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
