const express = require('express')
const router = express.Router()
const ProductModel = require("../../models/Product")
const ProductService = require('../../services/product-service')
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

// Add product
router.post('/add', upload.single('image'), async (req, res) => {
    req.body.img = req.file.filename
    await ProductService.add(req.body)
})

// Get products
router.get('/', async (req, res) => {
    const products = await ProductService.findAll()
    res.send(products)
})

// Get product from id
router.get('/:id', async (req, res) => {
    let product = await ProductService.find(req.params.id)
    res.send(product)
})




module.exports = router