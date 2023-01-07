const express = require('express');
const fs = require('fs');

const PORT = 3001;
const app = express();

// npm package that will give each note a unique id when it's saved 
var uniqid = require('uniqid');

// Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// API and HTML routes
require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

// Starts server -- listening
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

