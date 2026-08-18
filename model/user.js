const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["Admin", "Mod", "User"],
        default:"User"
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User