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

    async likeComment(user, comment) {
        comment.like.push(user)
        await comment.save()
    }

    async deleteLike(comment, index) {
        comment.like.splice(index, 1)
        await comment.save()
    }

    async dislikeComment(user, comment) {
        comment.dislike.push(user)
        await comment.save()
    }

    async deleteDislike(comment, index) {
        comment.dislike.splice(index, 1)
        await comment.save()
    }

    async banned(user){
        user.isVerified = false
        await user.save()
    }

    async unBanned(user){
        user.isVerified = true
        await user.save()
    }
}

module.exports = new UserService()