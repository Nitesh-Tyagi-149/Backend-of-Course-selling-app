// const express = require('express');
// const Router = express.Router; 
// const userRouter = new Router();     // Create a new Router instance


const {Router} = require("express");
const userRouter = Router();
const {userModel} = require("../DB/DB");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "aladirj443"


userRouter.post('/signUp' , async  (req, res) => {
    const {email, password, firstName, lastName} = req.body; //TODO: adding ZOD validation
    //TODO: hash the password so plain text pw is not stored in the DB

    try{
        await userModel.create({
        email:email,
        password:password,
        firstName,
        lastName
        })
    }catch(e){
        console.log(e)
    }

    res.send("signUp")
})

userRouter.post('/signin' , async (req,res)=>{
const {email , password} = req.body;

const user = await userModel.findOne({  //it is returning user or undefine but find method return arry [] which could be of length of 0, 1, 2
    email:email,
    password:password  
    
})

if (user) {
   const token =  jwt.sign({
        id:user._id
    },JWT_USER_PASSWORD)
    
// Do cookies based authentication if needed

    res.json({
        token:token
    })
}else{
    res.status(403).json({
        message: "Incorrect credentials "
    })
}
})

userRouter.get('/purchase' , (req,res)=>{
    res.send("purchase")
})

module.exports = {userRouter};