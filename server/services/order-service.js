const BaseService = require('../services/base-service')
const OrderModel = require('../models/Order')

 class OrderService extends BaseService {
    model = OrderModel
    
    async inCargo(order){
        order.inCargo = true
        order.isComplete = false
        await order.save()
    }

    async delivered(order){
        order.inCargo = false
        order.isComplete = true
        await order.save()
    }
}

module.exports = new OrderService()