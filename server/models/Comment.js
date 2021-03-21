const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    like: {
        type: Array,
        default: null
    },
    dislike: {
        type: Array,
        default: null
    }
})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel