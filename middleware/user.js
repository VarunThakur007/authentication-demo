const Sessions = require("../model/sessions")
const User = require("../model/user")

const { v4:uuidv4 } = require("uuid")

async function restrictToValidInUser(req,res,next) {
    const sessionId = req.cookies.sessionId
    const session = await Sessions.findOne({sessionId:sessionId})

    if (!session) {
        return res.status(400).end("please sign In first")
    }
    next()
}

async function handleSignIn(req,res,next) {
    const name = req.body.name
    const email = req.body.email
    const user = await User.findOne({name:name,email:email})

    if (!user) {
        return res.status(400).end("Invalid name or email")
    }
    const sessionId = uuidv4()
    const userId = user._id
    const entry = new Sessions({ sessionId : sessionId, userId : userId})
    await entry.save()
    res.cookie("sessionId",sessionId)
    return res.status(201).end("name :" + name + "id" + userId + "sessionId " + sessionId)
}

module.exports = { restrictToValidInUser , handleSignIn }