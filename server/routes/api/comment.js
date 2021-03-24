const express = require('express')
const router = express.Router()
const CommentService = require('../../services/comment-service')
const UserService = require('../../services/user-service')
const passport = require("passport")


// Add Comment
router.post('/add', passport.authenticate("jwt", {session: false}), async (req, res) => {
    const user = await UserService.find(req.user.id)
    const data = {
        productId: req.body.productId,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        description: req.body.description
    }
    await CommentService.add(data)
    res.send(data)
})


// Add Like
router.post('/:id/like',passport.authenticate("jwt", {session: false}), async (req, res) => {
    const user = await UserService.find(req.user.id)
    const comment = await CommentService.find(req.params.id)

    const likeControl = comment.like.find(element => {
        return element.id == user.id
    })
    if(likeControl){
        await UserService.deleteLike(comment, comment.like.indexOf(likeControl))
    }else{
        const dislikeControl = comment.dislike.find(element => {
            return element.id == user.id
        })
        if(dislikeControl){
            await UserService.deleteDislike(comment, comment.dislike.indexOf(dislikeControl))
            await UserService.likeComment(user, comment)
        }else{
            await UserService.likeComment(user, comment)
        }
    }
    const comments = await CommentService.findByProductId(comment.productId)
    res.send(comments)
    
})


// Add Dislike
router.post('/:id/dislike',passport.authenticate("jwt", {session: false}), async (req, res) => {
    const user = await UserService.find(req.user.id)
    const comment = await CommentService.find(req.params.id)
    
    const dislikeControl = comment.dislike.find(element => {
        return element.id == user.id
    })
    if(dislikeControl){
        await UserService.deleteDislike(comment, comment.dislike.indexOf(dislikeControl))
    }else{
        const likeControl = comment.like.find(element => {
            return element.id == user.id
        })
        if(likeControl){
            await UserService.deleteLike(comment, comment.like.indexOf(likeControl))
            await UserService.dislikeComment(user, comment)
        }else{
            await UserService.dislikeComment(user, comment)
        }
    }
    const comments = await CommentService.findByProductId(comment.productId)
    res.send(comments)
})


// Get Comments from productId
router.get('/:id', async(req, res) => {
    const comments = await CommentService.findByProductId(req.params.id)
    res.send(comments)
})


module.exports = router