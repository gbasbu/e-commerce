const ProductModel = require('../models/Product')

 class ProductService {
    model = ProductModel

    async findAll() {
      return this.model.find()
    }
  
    async find(itemId) {
        return this.model.findById(itemId)
    }

    async add(item) {
      return this.model.create(item)
    }
  
}

module.exports = new ProductService()