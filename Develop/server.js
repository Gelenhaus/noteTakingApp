const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ db: notesArray }, null, 2)
    );
    return note;
}

app.get('/api/db', (req, res) => {
    res.json(db);
});

app.post('/api/db', (req, res) => {
    // req.body is where our incoming content will be
    const note = createNewNote(req.body, notes);
    res.json(note);

});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});