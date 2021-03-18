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
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel