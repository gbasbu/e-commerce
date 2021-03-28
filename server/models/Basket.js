const mongoose = require('mongoose')

const BasketSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId:{
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productBrandName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 1
    }
})

const BasketModel = mongoose.model('Basket', BasketSchema)

module.exports = BasketModel