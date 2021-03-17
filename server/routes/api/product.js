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
router.post('/product/add', upload.single('image'), async (req, res) => {
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
            return res.status(201).json({
                success: true,
                msg: 'Successfully created product.'
            })
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong.Please try again later.'
        })
    }
})



module.exports = router