const BaseService = require('../services/base-service')
const CommentModel = require('../models/Comment')

class CommentService extends BaseService {
    model = CommentModel

    async findByProductId(productId) {
        return this.model.find({ productId: productId })
    }
}

module.exports = new CommentService()