const port = 3000;
const express = require('express');
const app = express();
const notes = require('./routes/notes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => res.send('It\'s Alive!'))
app.get('/notes', notes.getAll)
app.get('/notes/:id', notes.getNote)
app.post('/notes', notes.newNote)
app.delete('/notes/:id', notes.dropNote)

app.listen(port, ()=> console.log(`App listening on port ${port}!`))
