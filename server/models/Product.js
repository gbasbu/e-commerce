const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    }]
})

ProductSchema.plugin(require('mongoose-autopopulate'))


const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel