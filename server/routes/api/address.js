const express = require('express')
const router = express.Router()
const passport = require("passport")
const AddressService = require('../../services/address-service')

// Add Address
router.post('/add', passport.authenticate("jwt", {session: false}), async (req, res) => {
    req.body.userId = req.user.id
    const address = await AddressService.add(req.body)
    res.send(address)
})

// Get Addresses
router.get('/', passport.authenticate("jwt", {session: false}), async (req, res) => {
    const addresses = await AddressService.findAll(req.user.id)
    res.send(addresses)
})

// Delete Address
router.delete('/:id/delete', async (req,res) => {
    const address = await AddressService.find(req.params.id)
    await AddressService.del(req.params.id)
    res.send(address)
})

// Update Address
router.put('/:id/update', async (req, res) => {
    await AddressService.update(req.params.id, req.body)
    const address = await AddressService.find(req.params.id)
    res.send(address)
})



module.exports = router;