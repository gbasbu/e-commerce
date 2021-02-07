const mongoose = require('mongoose')

const AdressSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    telNo: {
        type: Number,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    addressTitle: {
        type: String,
        required: true
    },
    userID: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const AddressModel = mongoose.model('Address', AdressSchema)

module.exports = AddressModel