const express = require('express');
const db = require('./db/db.json');
//the {} was trying to grab something within the db file

const app = express();
const PORT = process.env.PORT || 3001;


app.get('/api/db', (req, res) => {
    res.json(db);
});

// app.get('/api/db', (req, res) => {
//     res.send("This is working.");
// });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});