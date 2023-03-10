const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const util = require('util');

const PORT = process.env.PORT || 3001;

// Sets up express app to handle data parsing
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

const readFromFile = util.promisify(fs.readFile);

// Route to notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API Routes -- reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
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
                fs.writeFile('./db/db.json', JSON.stringify(jsonParse, null, 4), 
                (err) => err ? console.error(err) : console.info('Success!'));
            }
        })
        res.json('note has been added')
    } else {
        res.error('note failed to add')
    }
});

// Delete notes
app.delete('/api/notes/:id', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== req.params.id);

        fs.writeFile('./db/db.json', JSON.stringify(result, null, 4), (err) => err ? console.error(err) : console.info('Success!'));

        res.json(`Item ${req.params.title} has been deleted!`);
    })
})

// Returns the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// Starts server -- listening
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

