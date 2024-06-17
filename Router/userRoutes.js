// bcz we only need router from express
const loginUser = require('../Controllers/User/loginUser');
const registerUser = require('../Controllers/User/registerUser')
const userRoutes = require('express').Router()

userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser);


module.exports = userRoutes;