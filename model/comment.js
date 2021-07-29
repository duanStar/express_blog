const mongoose = require('mongoose');
const c = require('config');

const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}