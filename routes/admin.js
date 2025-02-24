const {Router} = require('express')
const adminRouter = Router();
const {adminModel, courseModel} = require("../DB/DB")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const {adminMiddleware} = require('../middleware/admin')
//bcrypt, zod



app.use(express.json());


adminRouter.post('/signup', async function(req,res){
    const {email, password, firstName, lastName} = req.body; //TODO: adding ZOD validation
    //TODO: hash the password so plain text pw is not stored in the DB

    try{
        await adminModel.create({
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


adminRouter.post('/signin', async function(req,res){
    const {email , password} = req.body;

const admin = await adminModel.findOne({  //it is returning user or undefine but find method return arry [] which could be of length of 0, 1, 2
    email:email,
    password:password  
    
})

if (admin) {
   const token =  jwt.sign({
        id:admin._id
    },process.env.JWT_ADMIN_PASSWORD)
    
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


adminRouter.post('/course', adminMiddleware, async function(req,res){
    const admin = req.userId;
    const {title , description, imageUrl, price} = req.body;

   const course = await courseModel.create({
        title , description, imageUrl, price, creatorId
    })

    res.json({
        message: "Course Created",
        courseId: course._id
    })
})


adminRouter.put('/course',adminMiddleware, async function(req,res){
    const adminId = req.userId;

    const {title , description, imageUrl, price, courseId} = req.body;

   const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
   },{
        title , description, imageUrl, price
    })

    res.json({
        message: "Course Updated",
        courseId: course._id
    })
    
})


adminRouter.get('/course/bulk',adminMiddleware, async function(req,res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        _id: courseId,
        creatorId: adminId
   });

    res.json({
        message: "Course Updated",
        courses
    })
})


module.exports = {adminRouter};