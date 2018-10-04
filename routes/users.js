const User = require('../models/users')
const express = require('express')
const router = express.Router()
const uuid = require('uuid/v4')
exports.isLoggedIn = (id, sessionId, res)=>{
	User.findOne({'_id' : id, 'sessions' : sessionId}, (err,user)=>{if(err) res("Authentication failed due to error: " + err); else if(user==null) res("You are not logged in"); else res()})
}
//TODO: implement proper password hashing on login request
//Users are logged in via the presence of a session ID, which if compromised can be easily invalidated by logging off then on.
router.logIn = (req,res)=>{
	User.findOneAndUpdate({'name': req.body.username, 'passwordHash' : req.body.hash}, {$push : {'sessions' : uuid()}}, (err,user)=>{if(err) res.send("Log in Failed."); else if(user==null) res.send("Log in Failed"); else {res.cookie('userId', user._id); res.cookie('sessionId', user.sessions[user.sessions.length-1]); res.send("Log in Successful")}});
}
router.register = (req,res)=>{
	User.create({'name': req.body.username, 'passwordHash' : req.body.hash}, (err, user)=>{if (err) res.send("Registration Failed"); else res.send("Registration successful")})
}
router.deregister = (req,res)=>{
	exports.isLoggedIn(req.cookies.userId, req.cookies.sessionId, (err)=>{if(err)res.send("You need to be logged in to deregister your account"); else User.findByIdAndRemove(req.cookies.userId, (err)=>{if(err) res.send("Deregistration failed due to error: " + err); else {res.clearCookie('userId');res.clearCookie('sessionId');res.send("Successfully deregistered")}})})
}
router.logOut = (req,res)=>{
	User.findByIdAndUpdate(req.cookies.userId, {$pull : {'sessions' : req.cookies.sessionId}}, (err)=>{if(err) res.send("Log out Failed."); else {res.clearCookie('userId'); res.clearCookie('sessionId'); res.send("Successfully Logged Out")}})
}
exports.logIn = router.logIn
exports.logOut = router.logOut
exports.register = router.register
exports.deregister = router.deregister
