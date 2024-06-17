const express = require('express')
require("dotenv").config()
const connection = require('./config/db');
const userRoutes = require('./Router/userRoutes')

// get the port number from .env file , if that port does not available then select 8080
const PORT = process.env.PORT || 8080;
const app = express()

// middleware
app.use(express.json())

// userRoutes is the main route , inside it, there will be /register, /login etc
app.use('/userRoutes',userRoutes)
app.get('/',(_,res)=>{
    res.json({response:"Get Route Successfully Created!"})

})


app.listen(PORT,async()=>{
    try {
        await connection(process.env.MONGODB_URI)
        console.log(`Server is running on port ${PORT}, and Database is connected successfully`)
    } catch (error) {
        console.log(error)
    }
})