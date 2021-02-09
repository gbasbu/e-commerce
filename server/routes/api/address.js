const express = require('express')
const router = express.Router()
const AddressModel = require("../../models/Address")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const key = require("../../config/keys").tokenKey;
const { response } = require('express')



/**
 * @route POST /address/add
 * @desc Add address
 * @access Private
 */
router.post('/address/add', passport.authenticate("jwt", {session: false}), async (req, res) => {
    const userID = req.user.id
    const { firstName, lastName, telNo, province, county, address, addressTitle } = req.body
    const newAddress = new AddressModel({
        firstName,
        lastName,
        telNo,
        province,
        county,
        address,
        addressTitle,
        userID
    })
    const savedAddress = await  AddressModel.findOne({ addressTitle: addressTitle })
    if(savedAddress){
        return res.status(400).json({
            success: false,
            msg: 'Address title already saved. Please change address title.'
        })
    }else{
        await newAddress.save().then(() => {
            return res.status(201).json({
                success: true,
                msg: 'Successfully saved new address.'
            })
        })
    }
})

/**
 * @route Get /address/get
 * @desc Get address from user id
 * @access Private
 */
router.get('/address/get', passport.authenticate("jwt", {session: false}), async (req, res) => {
        let address = await AddressModel.find({ userID: req.user.id })
        if(!address){
            return res.status(400).json({
                success: false,
                msg: 'Address is not found.'
            }) 
        }else{
            return res.json({
                address: address
            })
        }
    }
)

/**
 * @route Delete /address/delete
 * @desc Delete address from address id
 * @access Private
*/
router.delete('/address/delete/:id', async (req,res) => {
    let address = await AddressModel.findById(req.params.id)
    if(address){
        try {
            await AddressModel.findByIdAndDelete(address.id)
            return res.status(201).json({
                success: true,
                msg: 'Successfully deleted.'
            })
        } catch (err) {
            return res.status(201).json({
                success: false,
                msg: 'Something wrong. Please try again later.'
            })
        }
    }else{
        return res.status(400).json({
            success: false,
            msg: 'Address is not found.'
        })
    }
})

module.exports = router;