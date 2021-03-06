const express = require('express');
let db = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

//Public
app.use(express.static("public"));



app.get('/api/notes', (req, res) => {
    db = JSON.parse(fs.readFileSync("./db/db.json")) || []
    console.log("Get", db)
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    const note = createNewNote(req.body, db);
    console.log("Post", note);
    res.json(note);
    function createNewNote(body, notesArray) {
        const note = {
            id: `${Math.floor(Math.random() * 100)}`,
            title: body.title,
            text: body.text
        }
        notesArray.push(note);
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(notesArray), function (err, data) {
                if (err) throw err;
            }
        );
        return notesArray;
    }
});

app.delete('/api/notes/:id', function (req, res) {
    console.log("Its connected dood!")
    const { id } = req.params;

    const thingsToGo = db.findIndex(db => db.id === id);
    console.log("thingToGo = " + thingsToGo);
    db.splice(thingsToGo, 1);
    let dbString = JSON.stringify(db);
    console.log(dbString);
    fs.writeFile("db/db.json", dbString, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success dood");
        }
    })
})


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});