const express = require('express');
const db = require('./db/db.json');
//the {} was trying to grab something within the db file

const app = express();


app.get('/api/db', (req, res) => {
    res.json(db);
});

// app.get('/api/db', (req, res) => {
//     res.send("This is working.");
// });

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});