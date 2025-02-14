const express = require('express')
const jsonwebtoken = require('jsonwebtoken');
const { userRouter} = require("./routes/user")
const { courseRouter} = require("./routes/course")
const {adminRouter} = require('./routes/admin')


const app = express(); 

app.use("/api/v1/user",userRouter)
app.use("/api/v1/courses",courseRouter)
app.use("/api/v1/courses", adminRouter)



app.listen(3000)