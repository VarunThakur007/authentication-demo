const express = require("express")
const User = require("../model/user")
const router = express.Router()

const {handleCreateUser} = require("../controller/user")
const {handleSignIn, restrictToValidInUser} = require("../middleware/user")

router.post("/users",handleCreateUser)
router.post("/users/signIn",handleSignIn)
router.get("/users",restrictToValidInUser, async (req, res) => {
    const users = await User.find({})
    res.render("displayUsers" ,{
        users:users
    })
})

router.get("/signIn", (req,res) => {
    res.render("signIn")
})

router.get("/register", (req,res) => {
    res.render("createUser")
})


module.exports = router