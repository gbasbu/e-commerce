const express = require('express')
const router = express.Router()
const ProductModel = require("../../models/Product")
const multer = require('multer')

// Define storage for the images
const storage = multer.diskStorage({
    // Destination for files
    destination: function(req, file, call) {
        call(null, 'public/images')
    },
    // Add back the extension
    filename: function(req, file, call) {
        call(null, Date.now() + file.originalname)
    }
})

// Upload params for multer
const upload = multer({
    storage: storage,
    limits:{
        fieldSize: 1024 * 1024 * 3
    }
})

/**
 * @route POST /product/add
 * @desc Add product
 * @access Private
*/
router.post('/add', upload.single('image'), async (req, res) => {
    const { title, brandName, stock, price } = req.body
    const img = req.file.filename
    try {
        const newProduct = new ProductModel({
            title,
            brandName,
            stock,
            price,
            img
        })
        await newProduct.save().then(() => {
            res.send(newProduct)
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong.Please try again later.'
        })
    }
})

/**
 * @route GET /products/get
 * @desc Get products
 * @access Public
*/
router.get('/', async (req, res) => {
    try {
        let products = await ProductModel.find()
        res.send(products)
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }
})

/**
 * @route GET /product/get/:id
 * @desc Get product from id
 * @access Public
*/
router.get('/:id', async (req, res) => {
    try {
        let product = await ProductModel.findOne({ _id: req.params.id })
        res.send(product)
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }
})




module.exports = router