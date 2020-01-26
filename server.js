const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Establishing connection with the database
require("dotenv").config();
const db = process.env.MONGODB_URI
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(Error, err.message);
    });

// Use routes - do not forget the first slash - I did initially:)
app.use('/api/items', items);

// Testing "hi" below
// app.use((req, res, next) => {
//     res.send("hi")
// })

// Starting server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))