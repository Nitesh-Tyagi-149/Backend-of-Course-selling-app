const {Router} = require('express')
const adminRouter = Router();
const {adminModel} = require("../DB/DB")
const jwt = require("jsonwebtoken")
//bcrypt, zod

const JWT_ADMIN_ASSWORD = "dfhjg463769jsdgh";

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
    },JWT_ADMIN_ASSWORD)
    
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


adminRouter.post('/course',function(req,res){
    
})

adminRouter.put('/course',function(req,res){
    
})

adminRouter.get('/course/bulk',function(req,res){
    
})


module.exports = {adminRouter};