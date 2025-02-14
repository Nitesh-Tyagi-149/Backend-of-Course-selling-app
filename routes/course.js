const { Router } = require("express")

const courseRouter = Router();

courseRouter.post('/purchase' , (req,res)=>{
res.send("purchase")   
})

courseRouter.get('/' , (req,res)=>{
    res.send("/adfskjh")
})

module.exports = {courseRouter};