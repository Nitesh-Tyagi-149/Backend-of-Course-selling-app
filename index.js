const express = require('express')
const jsonwebtoken = require('jsonwebtoken');
const { userRouter} = require("./routes/user")
const { courseRouter} = require("./routes/course")
const {adminRouter} = require('./routes/admin');
// const { mongo, default: mongoose } = require('mongoose');


const app = express(); 

app.use("/api/v1/user",userRouter)
app.use("/api/v1/courses",courseRouter)
app.use("/api/v1/courses", adminRouter)
app.use(express.json());

// async function main (){
//     await mongoose.connect("mongodb+srv://Admin_:IqJlNlEGA6PlCe@cluster0.fcf5s.mongodb.net/")
// }

// main();

app.listen(3000)