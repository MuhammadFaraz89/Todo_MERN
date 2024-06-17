const UserModel = require("../../model/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  // get all the inputs from the user
  const { username, email, password, role } = req.body;
  try {
    // check wether is already exist or not, here key and value are same like email:email so we write it once
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(203).json({ msg: "User Already Exist !" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    // save the user
    await newUser.save();

    return res.status(201).json({ msg:"User Registered Successfully!" ,newUser});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = registerUser;