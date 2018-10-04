const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({ id: Schema.Types.ObjectId, name: String, passwordHash: String, sessions: [String]})
const User = mongoose.model('User', userSchema)

module.exports = User;
