const express = require('express')
const router = express.Router()
const passport = require("passport")
const UserService = require('../../services/user-service')
const ProductService = require('../../services/product-service')
const OrderService = require('../../services/order-service')
const cloudinary = require('../../utils/cloudinary')

// Get all users
router.get('/users', async (req, res) => {
    const users = await UserService.findAll()
    res.send(users)
})

// Ban user
router.post('/user/:id/ban', async (req, res) => {
    const user = await UserService.find(req.params.id)
    await UserService.banned(user)
    const users = await UserService.findAll()
    res.send(users)
  
})

// Unban user
router.post('/user/:id/unban', async (req, res) => {
    const user = await UserService.find(req.params.id)
    await UserService.unBanned(user)
    const users = await UserService.findAll()
    res.send(users)
    
})

// Delete user
router.delete('/user/:id/delete', async (req, res) => {
    await UserService.del(req.params.id)
    const users = await UserService.findAll()
    res.send(users)
})

// Delete product
router.delete('/product/:id/delete', async (req, res) => {
    const product = await ProductService.find(req.params.id)
    await cloudinary.uploader.destroy(product.cloudinaryId)
    await ProductService.del(req.params.id)
    const products = await ProductService.findAll()
    res.send(products)
})

// Update product
router.put('/product/update', async (req, res) => {
    await ProductService.update(req.body)
    const products = await ProductService.findAll()
    res.send(products)
})

// Get orders
router.get('/orders', async(req, res) => {
    const orders = await OrderService.findAll()
    res.send(orders.sort(function(a,b){ return new Date(b.date) - new Date(a.date) }))
})

// Order in cargo
router.post('/order/:id/cargo', async(req, res) => {
    const order = await OrderService.find(req.params.id)
    await OrderService.inCargo(order)
    const orders = await OrderService.findAll()
    res.send(orders.sort(function(a,b){ return new Date(b.date) - new Date(a.date) }))
})

// Order is complete
router.post('/order/:id/complete', async(req, res) => {
    const order = await OrderService.find(req.params.id)
    await OrderService.delivered(order)
    const orders = await OrderService.findAll()
    res.send(orders.sort(function(a,b){ return new Date(b.date) - new Date(a.date) }))
})

module.exports = router