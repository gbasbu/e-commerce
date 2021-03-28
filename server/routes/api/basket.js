const express = require('express')
const router = express.Router()
const passport = require("passport")
const BasketService = require('../../services/basket-service')
const ProductService = require('../../services/product-service')
const BasketModel = require('../../models/Basket')


// Add Basket
router.post('/:id/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const product = await ProductService.find(req.params.id)
    let item = {
        userId: req.user.id,
        productId: product.id,
        productTitle: product.title,
        productBrandName: product.brandName,
        productPrice: product.price,
        productImg: product.img,
    }
    const userBasket = await BasketService.findByUserId(req.user.id)
    const data = userBasket.find(element => {
        return element.productId == req.params.id
    })
    if(data == undefined){
        await BasketService.add(item)
        const basket = await BasketService.findByUserId(req.user.id)
        res.send(basket)
    }else{
        await BasketService.stockPlus(data)
        res.send(userBasket)
    }
})

// Product stok ++
router.put('/:id/plus', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const basket = await BasketService.findByUserId(req.user.id)
    const item = basket.find(element => {
        return element.productId == req.params.id
    })
    await BasketService.stockPlus(item)
    res.send(basket)
})

// Product stock --
router.put('/:id/minus', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const basket = await BasketService.findByUserId(req.user.id)
    const item = basket.find(element => {
        return element.productId == req.params.id
    })
    await BasketService.stockMinus(item)
    if(item.stock == 0){
        await BasketService.deleteByProductId(req.params.id)
        const newBasket = await BasketService.findByUserId(req.user.id)
        res.send(newBasket)
    }else{
        res.send(basket)
    }
})

// Get basket total price
router.get('/total', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const basket = await BasketService.findByUserId(req.user.id)
    let total = 0
    if(basket.length > 0){
        basket.forEach(element => {
            total += element.productPrice * element.stock
        });
    }
    res.json(total)
})

// Get Basket
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const basket = await BasketService.findByUserId(req.user.id)
    res.send(basket)
})

module.exports = router