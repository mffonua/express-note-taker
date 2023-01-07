const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const PORT = 3001;

// Sets up express app to handle data parsing
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// API Routes reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (error) {
            console.error(error);
        };
        res.json(JSON.parse(data));
    });
});

// Receives a new note to save on the request body, adds to db.json file, and returns new note to client
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            id: uniqid(),
            title,
            text,
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const jsonParse = JSON.parse(data);
                jsonParse.push(newNote);
                fs.writeFile(newNote, json.stringify(jsonParse, null, 4), 
                (err) => err ? console.error(err) : console.info(`nData written to ${newNote}`))
            }
        })
    }    
})

// returns the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// Starts server -- listening
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

