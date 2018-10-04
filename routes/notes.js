const Note = require('../models/notes')
const Auth = require('./users')
const express = require('express')
const router = express.Router()
//handlers for requests
router.getAll = (req,res) => {
	Auth.isLoggedIn(req.cookies.userId, req.cookies.sessionId, (err) => {if (err) res.send(err); else Note.find({'owner' : req.cookies.userId},(err,notes) => {if(err) res.send("Failed to retrieve Notes due to error: " + err); else res.json(notes)})})
}
router.getNote = (req, res) => {
	Note.findById(req.params.id,(err,note) => {if(err) res.send("Failed to retrieve Note due to error: " + err); else res.send(note)})
}
router.newNote = (req,res) => {
	Note.create({'owner': req.cookies.userId},(err)=>{if(err) res.send("Failed to create Note due to error: " + err); else res.redirect('/notes')})
}
router.dropNote = (req,res) => {
	Note.findByIdAndRemove(req.params.id, (err)=>{if(err) res.send("Failed to delete Note due to error: " + err); else res.redirect('/notes')})
}
router.newItem = (req,res) => {
	Note.findByIdAndUpdate(req.params.id,{$push : {'list': {label: req.body.label, done: 0}}}, (err)=>{if (err) res.send("Failed to create Item due to error: " + err); else res.redirect('/notes/' + req.params.id)})
}
//MongoDb cannot atomically toggle a boolean value, so we will represent the boolean with a parity check.
router.checkItem = (req,res) => {
	Note.findOneAndUpdate({'_id': req.params.id, 'list.label': req.params.label}, {$inc : {'list.$.done' : 1}}, (err)=>{if(err) res.send("Failed to check/uncheck Item due to error: " + err); else res.redirect('/notes/' + req.params.id)})
}
router.dropItem = (req,res) => {
	Note.findByIdAndUpdate(req.params.id,{$pull : {'list': {'id' : req.params.label}}},(err)=>{if(err) res.send("Failed to delete Item due to error: " + err); else res.redirect('/notes/' + req.params.id)})
}
router.tag = (req,res) => {
	Note.findByIdAndUpdate(req.params.id,{$push : {'tags': req.body.tag}}, (err)=>{if(err) res.send("Failed to create Tag due to error: " + err); else res.redirect('/notes/' + req.params.id)})
}
router.untag = (req,res) => {
	Note.findByIdAndUpdate(req.params.id, {$pull : {'tags': req.body.tag}}, (err)=>{if(err) res.send("Failed to delete Tag due to error: " + err); else res.redirect('/notes/' + req.params.id)})
}
router.getByTag = (req,res) => {
	Note.find({'tags' : req.params.tag, 'owner' : req.cookies.userId}, (err, notes)=>{if(err) res.send("Search failed due to error: " + err); else if(notes.length == 0) res.send("Could not find anything with that tag"); else res.json(notes)})
}
//TODO: implement deadlines and filtering overdue 
module.exports = router;
