const fs = require('fs');

// API Routes
app.get('/api/notes', (req, res) => {
    res.json({
        // should read the db.json file and return all saved notes as JSON.
    })
})

app.post('/api/notes', (req, res) => {

})

module.exports = apiRoute;