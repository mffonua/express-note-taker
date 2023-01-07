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


// random number


app.post('/api/notes', (req, res) => {
    
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// Starts server -- listening
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

