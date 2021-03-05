const express = require('express')
const router = express.Router()
const CategoryModel = require("../../models/Category")

/**
 * @route POST /category/add
 * @desc Add Category
 * @access Private
*/
router.post('/category/add', async (req, res) => {
    try {
        const { gender, category } = req.body
        const newCategory = new CategoryModel({
            gender,
            category
        })
        await newCategory.save().then(() => {
            return res.status(201).json({
                success: true,
                msg: 'Successfully created new category'
            })
        })
    } catch (err) {
            return res.status(400).json({
                success: false,
                msg: 'Category not created.'
            })
    }
})

/**
 * @route POST /categories/get
 * @desc Get Categories
 * @access Private
*/
router.get('/categories/get', async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        if(!categories){
            return res.status(400).json({
                success: false,
                    msg: 'Categories are not found.'
            })
        }else{
            return res.json({
                categories: categories
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }
})



module.exports = router;