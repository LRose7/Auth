const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // will associate the user to the post by it's id
        ref: 'users'
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
},
{ timestamps: true }
);

module.exports = Post = mongoose.model('post', PostSchema);