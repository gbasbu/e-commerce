const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    like: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    }],
    dislike: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    }]
})

CommentSchema.plugin(require('mongoose-autopopulate'))


const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel