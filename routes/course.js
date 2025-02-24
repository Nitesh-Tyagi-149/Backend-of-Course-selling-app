const { Router } = require("express");
const {userMiddleware} = require("../middleware/user")
const { purchaseModel, courseModel } = require("../DB/DB");

const courseRouter = Router();

courseRouter.post('/purchase' ,userMiddleware, async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;
// should check that the user has actually paid the price
    await purchaseModel.create({
        userId,
        courseId
    })
    
    res.json({
        message:"you have successfully bouught the course"
    })
    
})

courseRouter.get('/preview' , async (req,res)=>{
    const courses = await courseModel.find({});

    res.json({
       courses
    })
})

module.exports = {courseRouter};