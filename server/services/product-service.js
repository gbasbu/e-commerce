const BaseService = require('../services/base-service')
const ProductModel = require('../models/Product')

class ProductService extends BaseService {
  model = ProductModel
 
  async sortByIncreasing(products){
    return await products.sort(function(a,b){ return a.price - b.price})
  }

  async sortingByDescending(products){
    return await products.sort(function(a,b){ return b.price - a.price })
  }

  async sortingByAlphabetical(products){
    return await products.sort(function(a,b){ return a.title.localeCompare(b.title) })
  }

  async sortingByReverseAlphabetical(products){
    return await products.sort(function(a,b){ return b.title.localeCompare(a.title) })
  }
}

module.exports = new ProductService()