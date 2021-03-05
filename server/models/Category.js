const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    gender:{
        type: String
    },
    category:{
        type: String
    }
})

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel