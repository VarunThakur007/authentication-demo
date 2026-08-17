require('dotenv').config();
const mongoose = require("mongoose")
const express = require("express")
const connectDb = require("./connection/connectDb")
const userRouter = require("./router/user")
const cookieParser = require("cookie-parser")



const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

connectDb()
app.set("view engine", "ejs")

app.use("/",userRouter)

app.listen(8000, () => {
    console.log("Server started at port 8000")
})

