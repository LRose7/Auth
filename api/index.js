if (process.env.NODE_ENV = 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const profileRoute = require('./routes/profile');
const postsRoute = require('./routes/posts');

// set up express app
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
});

// Routes
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);

const connection_string = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// connect to MongoDB
mongoose.connect(connection_string, {    
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connection Established..."))
.catch(error => console.error("MongoDB Connection Failed: ", error.message));