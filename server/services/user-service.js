const BaseService = require('../services/base-service')
const UserModel = require('../models/User')

 class UserService extends BaseService {
    model = UserModel

    async findByEmail(email) {
        return this.model.find({ email: email })
    }

    async findByResetToken(token) {
        return this.model.find({ resetToken: token })
    }
}

module.exports = new UserService()