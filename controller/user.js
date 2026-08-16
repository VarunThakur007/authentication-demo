const User = require("../model/user")

async function handleCreateUser(req , res) {
    const name = req.body.name
    const email = req.body.email

    const entry = new User({name : name, email : email})
    await entry.save()

    return res.status(201).end("")
}

async function handleGetUser(req , res) {
    const users = await User.find({})
    return res.render("displayUsers" , {users})
}

module.exports = {handleCreateUser, handleGetUser}