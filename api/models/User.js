const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        min: 2,
        max: 30,
        required: true,
        unique: true
    },
    email: {
        type: String,
        max: 50,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        min: 6,
        max: 30,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
},
{ timestamps: true }
);

module.exports = User = mongoose.model('users', UserSchema);