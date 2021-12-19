const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// set up express app
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// connect to MongoDB
const connection_string = process.env.MONGODB_URI;
mongoose
.connect(connection_string)
.then(() => console.log('MongoDB Connection Established'))
.catch(err => console.log(err));