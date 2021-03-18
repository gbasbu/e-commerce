const express = require('express')
const router = express.Router()
const CommentModel = require('../../models/Comment')
const passport = require("passport")

/**
 * @route Add /product/comment/add
 * @desc Add product comment
 * @access Private
*/
router.post('/comment/add', passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        let userID = req.user.id
        let { productID, comment } = req.body
        const newComment = new CommentModel({
            userID,
            productID,
            comment,
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


module.exports = router