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
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
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