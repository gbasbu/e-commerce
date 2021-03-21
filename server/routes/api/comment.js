const express = require('express')
const router = express.Router()
const CommentModel = require('../../models/Comment')
const UserModel = require('../../models/User')
const passport = require("passport")

/**
 * @route Add /comment/add
 * @desc Add product comment
 * @access Private
*/
router.post('/add', passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const userID = req.user.id
        const user = await UserModel.findOne({ _id: userID })
        let userName = user.firstName
        let userLastName = user.lastName
        let { productID, comment } = req.body
        const newComment =  new CommentModel({
            userID,
            productID,
            comment,
            userName,
            userLastName
        })
        await newComment.save().then(() => {
            return res.status(201).json({
                success: true,
                msg: 'Successfully saved your comment.'
            })
        }) 
    } catch (err) {
        // console.log(err);
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }
})

/**
 * @route Add /product/comment/like/add
 * @desc Add product comment like
 * @access Public
*/
router.post('/:id/like',passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const comment = await CommentModel.findOne({ _id: req.params.id })
        const likes = comment.like.filter(id => id == req.user.id)
        const dislikes = comment.dislike.filter(id => id == req.user.id)
        if(comment.userID == req.user.id){
            return res.status(400).json({
                success: false,
                msg: 'You dont like your comment.'
            })
        }else if(likes[0] == req.user.id) {
            return res.status(400).json({
                success: false,
                msg: 'You dont like it twice.'
            })
        }else{
            if(dislikes[0] == req.user.id) {
                comment.dislike.splice(req.user.id)
            }
            comment.like.push(req.user.id)
            comment.save().then(() => {
                return res.status(201).json({
                    success: true,
                    msg: 'Your like added successfully.'
                })
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }
})

/**
 * @route Add /product/comment/dislike/add
 * @desc Add product comment dislike
 * @access Public
*/
router.post('/:id/dislike',passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const comment = await CommentModel.findOne({ _id: req.params.id })
        const dislikes = comment.dislike.filter(e => e == req.user.id)
        const likes = comment.like.filter(id => id == req.user.id)
        if(comment.userID == req.user.id){
            return res.status(400).json({
                success: false,
                msg: 'You dont dislike your comment.'
            })
        }else if(dislikes[0] == req.user.id) {
            comment.like.splice(req.user.id)
        }else{
            if(likes[0] == req.user.id) {
                comment.like.splice(req.user.id)
            }
            comment.dislike.push(req.user.id)
            comment.save().then(() => {
                return res.status(201).json({
                    success: true,
                    msg: 'Your dislike added successfully.'
                })
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }
})


/**
 * @route Get /product/:id/comments/get
 * @desc Get product comment from product id
 * @access Public
*/
router.get('/:id/comments', async(req, res) => {
    try {
        const productID = req.params.id
        const comments = await CommentModel.find({ productID: productID })
        if(!comments){
            return res.status(400).json({
                success: false,
                    msg: 'Comments are not found.'
                }) 
            }else{
                return res.json({
                    comments: comments
                })
            }
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }

})


module.exports = router