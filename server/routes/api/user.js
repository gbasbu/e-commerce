const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserService = require('../../services/user-service')
const OrderService = require('../../services/order-service')
const key = require("../../config/keys").tokenKey;
const sgMail = require("@sendgrid/mail");
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API);


// User Register
router.post("/register", async (req, res) => {
  if (req.body.password !== req.body.confirm_password) {
    return res.status(400).json({
      msg: "Password do not match.",
      success: false,
    });
  }
  const user = await UserService.findByEmail(req.body.email)
  if (user.length == 0) {
    const emailToken = Math.floor(Math.random() * (999999 - 100000) + 100000);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        req.body.password = hash;
        req.body.emailToken = emailToken
        UserService.add(req.body).then((user) => {
          return res.status(201).json({
            success: true,
            msg: "User is registered.Check your mail and activate your account please.",
          })
        })
      })
    });
    const msg = {
      from: "g.basbug@hotmail.com",
      to: req.body.email,
      subject: "E-commerce - verify mail",
      text: `
      Hello, thanks for registering on my project.
      Please copy and paste the address below to verify your account.
      link: https://ecommerce-project-frontend.herokuapp.com/activation
      Code: ${emailToken}
      `,
      html: `
      <h2>Hello,</h2>
      <p>Thanks for registering on my project.</p>
      <p>Please copy and paste the address below to verify your account.</p>
      <a href="https://ecommerce-project-frontend.herokuapp.com/activation"><strong>Activation Link</strong></a>
      <p><strong>Activation Code: </strong>${emailToken}</p>
      `,
    };
    try {
      await sgMail.send(msg)
    } catch (err) {
      console.log(`Mail gönderilemedi: ${err}`);
    }
  }else {    
    return res.status(400).json({
      msg: "Email is already registred. Did you forgot your password?",
      success: false,
    })
  }   
})


// Email verify
router.post("/verify-email", async (req, res) => {
  try {
    const user = await UserService.findByEmail(req.body.email)
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User is not found.",
      });
    } else if (user.isVerified == true) {
      return res.status(400).json({
        success: false,
        msg: "Already activated your account.",
      });
    }
    user[0].emailToken = null;
    user[0].isVerified = true;
    user[0].save().then(() => {
      return res.status(201).json({
        success: true,
        msg: "Successfully activated.",
      });
    });
  }catch (err) {
    return res.status(400).json({
      success: false,
      msg: "Something wrong! Try again later please.",
    });
  }
});


// Reset request
router.post("/reset-request", async (req, res) => {
  try {
    const user = await UserService.findByEmail(req.body.email)
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User is not found.",
      });
    } else if (user.isVerified == false) {
      return res.status(400).json({
        success: false,
        msg: "User is not activated. Please check your mail.",
      });
    }else{
      user[0].resetToken = Math.floor(Math.random() * (999999 - 100000) + 100000);
      user[0].save().then(() => {
      res.status(201).json({
        success: true,
        msg: "Mail sending.Check your mail and click link.",
      });
    });
  }  
  const msg = {
    from: "g.basbug@hotmail.com",
    to: user[0].email,
    subject: "E-commerce - Reset Password",
    text: `
        Please copy and paste the address below to reset password your account.
        link: https://ecommerce-project-frontend.herokuapp.com/reset-password
        Reset Code: ${user[0].resetToken}
        `,
    html: `
        <h2>Hello,</h2>
        <>Please copy and paste the address below to reset your account.</>
        <a href="https://ecommerce-project-frontend.herokuapp.com/reset-password"><strong>Reset Password Link</strong></a>
        <p><strong>Reset Code: </strong>${user[0].resetToken}</p>
        `,
  };
    try {
      await sgMail.send(msg)
    } catch (err) {
      return res.status(400).json({
        success: false,
        msg: "We dont sending mail. Try again later please.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: "Something wrong! Try again later please.",
    });
  }
});


// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const user = await UserService.findByResetToken(req.body.resetToken)
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User is not found.",
      });
    }
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res.status(400).json({
        success: false,
        msg: "Passwords are not equal",
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
        if (err) throw err;
        user[0].password = hash;
        user[0].resetToken = null
        user[0].save().then((user) => {
          return res.status(201).json({
            success: true,
            msg: "Successfully. Password is changed.",
          });
        });
      });
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: "Something wrong! Try again later please.",
    });
  }
  
  
  
});


// User Login
router.post("/login", (req, res) => {
  try {
    UserService.findByEmail(req.body.email).then((user) => {
      if (user.length == 0) {
        return res.status(404).json({
          msg: "User is not found.",
          success: false,
        });
      } else if (user[0].isVerified == false) {
        return res.status(404).json({
          msg: "User is not activated. Please check your mail.",
          success: false,
        });
      }
      bcrypt.compare(req.body.password, user[0].password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            _id: user[0]._id,
            name: `${user[0].firstName} ${user[0].lastName}`,
            email: user[0].email,
          };
          jwt.sign(
            payload,
            key,
            {
              expiresIn: 604800,
            },
            (err, token) => {
              res.status(200).json({
                success: true,
                user: user[0],
                token: `Bearer ${token}`,
                msg: null,
              });
            }
          );
        }else {
          return res.status(404).json({
            msg: "Incorrect password.",
            success: false,
          });
        }
      });
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: "Something wrong! Try again later please.",
    });
  }
});


// Get user profile
router.get("/profile",passport.authenticate("jwt", {session: false,}),(req, res) => {
    return res.json({
      user: req.user,
    });
  }
);

// Get orders from user id
router.get('/orders', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const orders = await OrderService.findByUserId(req.user.id)
  res.send(orders.sort(function(a,b){ return new Date(b.date) - new Date(a.date) }))
})

module.exports = router;
