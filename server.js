const fs = require('fs');
const { notes } = require('./data/notes');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express (); 

const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function filter(query, notesArray) {
    let filteredResults = notesArray;
    if(query.title) {
        results = filteredResults.filter(notes => notes.title === query.title);
    }
    if(query.title) {
        results = filteredResults.filter(notes => notes.text === query.text);
    }
    return filteredResults;
}

function searchById(id, notesArray) {
    const searchResults = notesArray.filter(notes => notes.id === id)[0];
    return searchResults;
}

//create notes
function createNote(body, notesArray) {
    const note = body; 
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filter(req.query, results); 
    }
    res.json(results);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// app.get('/api/notes/:id', (req, res) => {
//     const result = searchById(req.params.id, notes);
//     res.json(result);
// });

app.post('/api/notes', (req, res) => {
    req.body.id = (notes.length + 1).toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not formatted correctly');
    } else {
        const note = createNote (req.body, notes);
        res.json(note);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});