const express = require('express')
const router = express.Router()
const AddressModel = require("../../models/Address")
const passport = require("passport")




/**
 * @route POST /address/add
 * @desc Add address
 * @access Private
 */
router.post('/address/add', passport.authenticate("jwt", {session: false}), async (req, res) => {
    const userID = req.user.id
    const { firstName, lastName, telNo, province, county, location, title } = req.body
    try {
        const newAddress = new AddressModel({
            firstName,
            lastName,
            telNo,
            province,
            county,
            location,
            title,
            userID
        })
        await newAddress.save().then(() => {
            return res.status(201).json({
                success: true,
                msg: 'Successfully saved new address.'
            })
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong.Please try again later.'
        })
    }
    
        
})

/**
 * @route Get /address/get
 * @desc Get address from user id
 * @access Private
 */
router.get('/address/get', passport.authenticate("jwt", {session: false}), async (req, res) => {
        try {
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
        } catch (err) {
            return res.status(201).json({
                success: false,
                msg: 'Something wrong. Please try again later.'
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
    try {
        let address = await AddressModel.findById(req.params.id)
        if (address) {
            await AddressModel.findByIdAndDelete(address.id)
            return res.status(201).json({
                success: true,
                msg: 'Successfully deleted.'
            })
        } else {
            return res.status(400).json({
                success: false,
                msg: 'Address is not found.'
            })
        }
    } catch (err) {
        return res.status(201).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }

})

/**
* @route Update /address/update
* @desc Update address from address id
* @access Private
*/
router.put('/address/update/:id', async (req, res) => {
    try {
        let address = await AddressModel.findById(req.params.id)
        if(address){
            await AddressModel.findByIdAndUpdate(address.id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                telNo: req.body.telNo,
                province: req.body.province,
                county: req.body.county,
                location: req.body.location,
                title: req.body.title
            })
            return res.status(201).json({
                success: true,
                msg: 'Successfully updated'
            })
        }else{
            return res.status(400).json({
                success: false,
                msg: 'Address is not updated.'
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Something wrong. Please try again later.'
        })
    }
})



module.exports = router;