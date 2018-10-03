let notes = require('../models/notes');
const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');

function get(id){
	let result = notes.filter((x)=>{return x.id == id})
	return result?result[0]:null
}
function getItem(id,label){
	let note = get(id);
	let item = note?note.list.filter((x)=>{return x.label == label}):null
	return item?item[0]:null
}
router.getAll = (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	res.json(notes);
}
router.getNote = (req, res) => {
	let note = get(req.params.id)
	if(!note)
		res.send("Could not find note!")
	else
		res.send(note)
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
router.newItem = (req,res) => {
	let note = get(req.params.id)
	if(!note)
		res.send("Could not find note to edit!")
	else{
		note.list.push({label: req.body.label, done:false})
		res.redirect('/notes/' + req.params.id)
	}
}
router.checkItem = (req,res) => {
	let item = getItem(req.params.id, req.params.label)
	if(!item)
		res.send("Could not find item to check/uncheck!")
	else{
		item.done = !item.done
		res.redirect('/notes/'+ req.params.id)
	}
}
router.dropItem = (req,res) => {
	let note = get(req.params.id)
	let item = getItem(req.params.id, req.params.label)
	if(!item)
		res.send("Could not find item to delete!")
	else{
		note.list.splice(note.list.indexOf(item),1)
		res.redirect('/notes/' + req.params.id)
	}
}
module.exports = router;
