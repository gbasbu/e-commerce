const BaseService = require('./base-service')
const AddressModel = require('../models/Address')

class AddressService extends BaseService {
    model = AddressModel
}

module.exports = new AddressService()