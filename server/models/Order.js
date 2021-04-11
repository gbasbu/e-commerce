const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    userId: { type: String },
    userName: { type: String },
    addressId: { type: String },
    date: { type: Date, default: Date.now },
    total: { type: Number, default: 0 },
    isComplete: { type: Boolean, default: false },
    inCargo: { type: Boolean, default: false },
    products: [{
        productId: { type: String },
        productBrandName: { type: String },
        productTitle: { type: String },
        productImg: { type: String },
        productCount: { type: Number },
        price: { type: Number }
    }],
    
})


const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel