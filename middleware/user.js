const Sessions = require("../model/sessions")
const jwt = require('jsonwebtoken');
const User = require("../model/user")

const { v4:uuidv4 } = require("uuid")

//for session based authentication
/*
async function restrictToValidInUser(req,res,next) {
    const sessionId = req.cookies.sessionId
    const session = await Sessions.findOne({sessionId:sessionId})

    if (!session) {
        return res.status(400).end("please sign In first")
    }
    next()
}
*/

//for session based authentication
/*
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
*/

//for JWT auten
async function handleSignIn(req, res) {
    //verify name and email is correct
    const name = req.body.name
    const email = req.body.email
    const user = await User.findOne({name : name, email : email})

    if (!user) {
        return res.status(400).end("Invalid name or email")
    }

    //create a jwt token
    
    //create jwt token claims
    const tokenData = {
        userId : user._id,
        time : Date()
    }

    //sign token usinf jwt secret
    const secretKey = process.env.jwtTokenSecret
    const token = jwt.sign(tokenData, secretKey)

    res.cookie('token',token,{
        httpOnly: true
    })
    
    res.status(200).end("token created and send successfully")
}

async function restrictToValidInUser(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).end("token not found in cookie")
    }
    try {
        const secretKey = process.env.jwtTokenSecret
        jwt.verify(token, secretKey)
        next()
    }
    catch (error) {
        res.status(401).end("please log In first")
    }
}

module.exports = { restrictToValidInUser , handleSignIn }