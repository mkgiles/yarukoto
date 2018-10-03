const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({ id: Schema.Types.ObjectId, list: [], tags: [String]})
const Note = mongoose.model('Note', noteSchema)

module.exports = Note;
