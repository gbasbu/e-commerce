const express = require('express')
const router = express.Router()
const AddressModel = require("../../models/Address")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const key = require("../../config/keys").tokenKey;



/**
 * @route POST /address/add
 * @desc Add address
 * @access Public
 */
router.post('/address/add', passport.authenticate("jwt", {session: false,}), async (req, res) => {
    const { firstName, lastName, telNo, province, county, address, addressTitle } = req.body
    const userID = req.user.id
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


module.exports = router;