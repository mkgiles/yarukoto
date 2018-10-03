const Note = require('../models/notes')
const express = require('express')
const router = express.Router()
//handlers for requests
router.getAll = (req,res) => {
	Note.find((err,notes) => {res.json(notes)})
}
router.getNote = (req, res) => {
	Note.find({'_id': req.params.id },(err,notes) => {if(err) res.send("Failed to retrieve Note due to error: " + err); else res.send(notes[0])})
}
router.newNote = (req,res) => {
	Note.create({},(err)=>{if(err) res.send("Failed to create Note due to error: " + err); else res.redirect('/notes')})
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
	Note.find({'tags' : req.params.tag}, (err, notes)=>{if(err) res.send("Search failed due to error: " + err); else if(notes.length == 0) res.send("Could not find anything with that tag"); else res.json(notes)})
}
module.exports = router;
