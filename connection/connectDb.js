const mongoose = require("mongoose")

async function connectDb(uri = "mongodb://127.0.0.1:27017/users") {
    await mongoose.connect(uri) 
}

module.exports = connectDb