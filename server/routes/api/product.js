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
    const product = await ProductService.add(req.body)
    res.send(product)
})

// Get products
router.get('/', async (req, res) => {
    const products = await ProductService.findAll()
    res.send(products) 
})

// Get product from id
router.get('/:id', async (req, res) => {
    const product = await ProductService.find(req.params.id)
    res.send(product)
})

// Sorting product 
router.get('/sort/:id', async (req, res) => {
    const products = await ProductService.findAll()
    if(req.params.id == 1){
        const result = await ProductService.sortByIncreasing(products)
        res.send(result)
    }else if(req.params.id == 2){
        const result = await ProductService.sortingByDescending(products)
        res.send(result)
    }else if(req.params.id == 3){
        const result = await ProductService.sortingByAlphabetical(products)
        res.send(result)
    }else if(req.params.id == 4){
        const result = await ProductService.sortingByReverseAlphabetical(products)
        res.send(result)
    }else{
        res.send(products)
    }
})




module.exports = router