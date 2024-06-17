const UserModel = require("../../model/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginUser = async(req,res)=>{

    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({message: "User Not Found!"});
        }
        // it takes two parameters: password entered by user and password saved in database
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch ){
            return res.status(404).json({message: "Invalid Credentials!"});
        }

        // if everything goes fine then generate the jwt-token
        // 
        const token = jwt.sign(
            {userId: user._id,username:user.username},"JWT_SECRET"
        );
        res.status(201).json({msg:"User Login Successfully !", token})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = loginUser;