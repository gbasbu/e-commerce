const BaseService = require('../services/base-service')
const AddressModel = require('../models/Address')

 class AddressService extends BaseService {
    model = AddressModel

    async findByUserId(userId) {
      return this.model.find({ userId: userId })
    }
  
}

module.exports = new AddressService()