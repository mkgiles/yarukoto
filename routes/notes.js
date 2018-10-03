let notes = require('../models/notes');
const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');

function get(id){
	let result = notes.filter((x)=>{return x.id == id})
	return result?result[0]:null
}
router.getAll = (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	res.json(notes);
}
router.getNote = (req, res) => {
	let result = get(req.params.id)
	res.send(result)
}
router.newNote = (req,res) => {
	let note = {id: uuid(), list: []}
	notes.push(note)
	res.redirect('/notes/' + note.id);
}
router.dropNote = (req,res) => {
	let note = get(req.params.id)
	if(!note)
		res.send("Could not find note to delete!")
	else{
		notes.splice(notes.indexOf(note),1)
		res.redirect('/notes')
	}
}
module.exports = router;
