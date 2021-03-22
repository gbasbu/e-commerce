const BaseService = require('../services/base-service')
const ProductModel = require('../models/Product')

class ProductService extends BaseService {
    model = ProductModel

    async findAll() {
      return this.model.find()
    }
  
}

module.exports = new ProductService()