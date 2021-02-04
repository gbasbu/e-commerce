const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const UserModel = require('../../models/User')
const key = require('../../config/keys').tokenKey
const crypto = require('crypto')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

/**
 * @route POST /users/register
 * @desc Register the User
 * @access Public
*/
router.post('/register', async (req, res) => {
    let { firstName, lastName, email, password, confirm_password } = req.body
    let emailToken = crypto.randomBytes(64).toString('hex')
    let isVerified = false
    // ENG: Password check & TR: Parola sorgusu
    if( password !== confirm_password ){
        return res.status(400).json({
            msg: "Password do not match.",
            success: false
        })
    }
    // ENG: Check for the unique Email & TR: Email kayıt kontrolü
    UserModel.findOne({ 
        email: email 
    }).then(user => {
        if(user) {
            return res.status(400).json({
                msg: "Email is already registred. Did you forgot your password?",
                success: false
            })
        }
    })
    // ENG: The data is valid and we can register the new user & TR: Data geçerli yeni kullanıcı oluşturulacak
    let newUser = new UserModel({ firstName, lastName, email,emailToken,isVerified, password })
    // ENG: Hash the password & TR: Password şifreleme
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err)
                throw err
            newUser.password = hash
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is registered.Check your mail and activate your account please."
                })
            })
        })
    })
    // ENG: Create verify mail & TR: Aktivasyon maili oluşturma
    const msg = {
        from: 'g.basbug@hotmail.com',
        to: newUser.email,
        subject: 'E-commerce - verify mail',
        text: `
        Hello, thanks for registering on my project.
        Please copy and paste the address below to verify your account.
        http://localhost:5000/api/users/verify-email?token=${newUser.emailToken}
        `,
        html: `
        <h2>Hello,</h2>
        <p>Thanks for registering on my project.</p>
        <p>Please copy and paste the address below to verify your account.</p>
        <a href="http://localhost:5000/api/users/verify-email?token=${newUser.emailToken}">Verify links here</a>
        `
    }
    // ENG: Send mail & TR: Mail gönderme
    try{
        await sgMail.send(msg)
    }catch(err){
        console.log(`Mail gönderilemedi: ${err}`);
    }                                              
})

/**
 * @route GET /users/verify-email
 * @desc Activate user account
 * @access Public
*/

router.get('/verify-email', async (req, res, next) => {
    try{
        const user = await UserModel.findOne({ emailToken: req.query.token })
        if(!user){
            res.redirect('http://localhost:8080/login')
        }
        user.emailToken = null
        user.isVerified = true
        await user.save().then(() => {
            res.redirect('http://localhost:8080/login')
        })
    }catch(err){
        console.log(`Verify Error: ${err}`);
    }
})

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
            })
        }else if (user.isVerified == false){
            return res.status(404).json({
                msg: 'User is not activated. Please check your mail.',
                success: true
            })
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
                        user: user,
                        token: `Bearer ${token}`,
                        msg: "You are now logged in."
                    })
                })
            }else{
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                })
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
    })
})


module.exports = router