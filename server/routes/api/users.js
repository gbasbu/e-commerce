const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UserModel = require('../../models/User');
const key = require('../../config/keys').tokenKey;

/**
 * @route POST /users/register
 * @desc Register the User
 * @access Public
*/
router.post('/register', (req, res) => {
    let {
        firstName,
        lastName,
        email,
        password,
        confirm_password
    } = req.body
    if( password !== confirm_password ){
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    // ENG: Check for the unique Email & TR: Email kayıt kontrolü
    UserModel.findOne({ 
        email: email 
    }).then(user => {
        if(user) {
            return res.status(400).json({
                msg: "Email is already registred. Did you forgot your password?"
            });
        }
    });
    // ENG: The data is valid and we can register the new user & TR: Data geçerli yeni kullanıcı oluşturulacak
    let newUser = new UserModel({
        firstName,
        lastName,
        email,
        password
    });
    // ENG: Hash the password & TR: Password şifreleme
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is registered."
                });
            });
        });
    });

});

/**
 * @route POST /users/login
 * @desc Signing in the User
 * @access Public
*/
router.post('/login', (req, res) => {
    UserModel.findOne({
        email: req.body.email
    }).then(user => {
        if(!user) {
            return res.status(404).json({
                msg: "User is not found.",
                success: false
            });
        }
        // ENG: If there is user we are now going to compare the password & TR: Eğer email kayıtlı ise password şifreleri kontrol edilecek
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if(isMatch){
                // ENG: User's password is correct and we need to send Json token for user & TR: Parola doğru ise json token verilecek
                const payload = {
                    _id: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email
                }
                jwt.sign(payload, key, { 
                    expiresIn: 604800 
                },(err, token) => {
                    res.status(200).json({
                        success:true,
                        token: `Bearer ${token}`,
                        msg: "You are now logged in."
                    });
                })
            }else{
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }

        })
    })
})

/**
 * @route POST /users/profile
 * @desc Return the User's data
 * @access Private
*/
router.get('/profile', passport.authenticate('jwt', {
    session: false
}),(req, res) => {
    return res.json({
        user: req.user
    });
});


module.exports = router