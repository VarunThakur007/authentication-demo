const mongoose = require("mongoose")

const sessions = mongoose.Schema({
    sessionId:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const Sessions = mongoose.model("sessions",sessions)

module.exports = Sessions