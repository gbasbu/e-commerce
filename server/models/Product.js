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
    }
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel