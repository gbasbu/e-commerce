const BaseService = require('../services/base-service')
const BasketModel = require('../models/Basket')

 class BasketService extends BaseService {
    model = BasketModel

    async stockPlus(product){
        product.stock++
        await product.save()
    }

    async stockMinus(product){
        product.stock--
        await product.save()
    }

    async deleteByProductId(productId){
        return this.model.deleteOne({ productId: productId })
    }

    async deleteByUserId(userId){
        return this.model.deleteMany({ userId: userId })
    }
}

module.exports = new BasketService()