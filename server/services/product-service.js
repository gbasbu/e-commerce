const BaseService = require('../services/base-service')
const ProductModel = require('../models/Product')

class ProductService extends BaseService {
  model = ProductModel
 
}

module.exports = new ProductService()