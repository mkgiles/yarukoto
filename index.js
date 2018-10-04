const port = 3000
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
//URI could be externalised
mongoose.connect('mongodb://localhost/yarukoto')
const notes = require('./routes/notes')
const users = require('./routes/users')
//Requests can be made in urleconded form or json form
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
/*
 * REST calls for CRUD operations:
 * GET for retrieval
 * POST for creation
 * PUT for update
 * DELETE for delete
 */
app.get('/notes', notes.getAll)
app.get('/notes/:id', notes.getNote)
app.post('/notes', notes.newNote)
app.delete('/notes/:id', notes.dropNote)
app.post('/notes/:id', notes.newItem)
//Tags before labels because otherwise express/node swallows up more specific URIs as part of more general ones
app.post('/notes/:id/tag', notes.tag)
app.delete('/notes/:id/tag', notes.untag)
//Using PUT for toggle for idemptotent operation
app.put('/notes/:id/:label', notes.checkItem)
app.delete('/notes/:id/:label', notes.dropItem)
app.get('/notes/search/:tag', notes.getByTag)
app.post('/users/login', users.logIn)
app.post('/users/register', users.register)
app.delete('/users/logout', users.logOut)
app.delete('/users/deregister', users.deregister)

app.listen(port, ()=> console.log(`App listening on port ${port}!`))
