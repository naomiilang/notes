const fs = require('fs');
const { notes } = require('./data/notes.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express (); 

const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function filter(query, notesArray) {
    let results = notesArray;
    if(query.title) {
        results = results.filter(notes => notes.title === query.title);
    }
    if(query.title) {
        results = results.filter(notes => notes.text === query.text);
    }
    return results;
}

function searchById(id, notesArray) {
    const searchResults = notesArray.filter(notes => notes.id === id)[0];
    return searchResults;
}
