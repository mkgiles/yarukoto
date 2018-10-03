const port = 3000;
const express = require('express');
const app = express();
const notes = require('./routes/notes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/notes', notes.getAll)
app.get('/notes/:id', notes.getNote)
app.post('/notes', notes.newNote)
app.delete('/notes/:id', notes.dropNote)
app.post('/notes/:id', notes.newItem)
app.put('/notes/:id/:label', notes.checkItem)
app.delete('/notes/:id:/:label', notes.dropItem)

app.listen(port, ()=> console.log(`App listening on port ${port}!`))
