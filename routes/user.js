// const express = require('express');
// const Router = express.Router; express().router

const {Router} = require("express");
const userRouter = Router();

userRouter.post('/signUp' , (req,res)=>{
    res.send("signUp")
})

userRouter.post('/signin' , (req,res)=>{
    res.send("signin")
})

userRouter.get('/purchase' , (req,res)=>{
    res.send("purchase")
})

module.exports = {userRouter};