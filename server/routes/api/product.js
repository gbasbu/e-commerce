const express = require('express')
const router = express.Router()
const ProductService = require('../../services/product-service')
const cloudinary = require('../../utils/cloudinary')
const upload = require('../../utils/multer')


// Add product
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        req.body.imgURL = result.secure_url
        req.body.cloudinaryId = result.public_id
        const product = await ProductService.add(req.body)
        res.send(product)
    } catch (err) {
        console.log(err);
    }
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
        res.send(products.sort(function(a,b){ return a.price - b.price }))
    }else if(req.params.id == 2){
        res.send(products.sort(function(a,b){ return b.price - a.price }))
    }else if(req.params.id == 3){
        res.send(products.sort(function(a,b){ return a.title.localeCompare(b.title) }))
    }else if(req.params.id == 4){
        res.send(products.sort(function(a,b){ return b.title.localeCompare(a.title) }))
    }else{
        res.send(products)
    }
})




module.exports = router