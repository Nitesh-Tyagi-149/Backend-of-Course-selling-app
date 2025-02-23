const express = require('express')
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const { userRouter} = require("./routes/user")
const { courseRouter} = require("./routes/course")
const {adminRouter} = require('./routes/admin');
require('dotenv').config;



const app = express(); 

app.use("/api/v1/user",userRouter)
app.use("/api/v1/courses",courseRouter)
app.use("/api/v1/admin", adminRouter)
app.use(express.json());

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}


main();

app.listen(3000)