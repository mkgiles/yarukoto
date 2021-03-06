const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({ id: Schema.Types.ObjectId, list: [], tags: [String], owner: String, deadline: Date})
const Note = mongoose.model('Note', noteSchema)

module.exports = Note;
