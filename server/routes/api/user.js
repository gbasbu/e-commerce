const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require("../../models/User");
const key = require("../../config/keys").tokenKey;
const sgMail = require("@sendgrid/mail");
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API);

/**
 * @route POST /users/register
 * @desc Register the User
 * @access Public
 */
router.post("/users/register", async (req, res) => {
  let { firstName, lastName, email, password, confirm_password } = req.body;
  let emailToken = Math.floor(Math.random() * (999999 - 100000) + 100000);
  let isVerified = false;
  // ENG: Password check & TR: Parola sorgusu
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password do not match.",
      success: false,
    });
  }
  // ENG: Check for the unique Email & TR: Email kayıt kontrolü
  const user = await UserModel.findOne({ email: email })
  if (user) {
    return res.status(400).json({
      msg: "Email is already registred. Did you forgot your password?",
      success: false,
    })
  } else {
    // ENG: The data is valid and we can register the new user & TR: Data geçerli yeni kullanıcı oluşturulacak
    let newUser = new UserModel({
      firstName,
      lastName,
      email,
      emailToken,
      isVerified,
      password,
    });
    // ENG: Hash the password & TR: Password şifreleme
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          return res.status(201).json({
            success: true,
            msg:
              "User is registered.Check your mail and activate your account please.",
          })
        })
      })
    });
    // ENG: Create verify mail & TR: Aktivasyon maili oluşturma
    const msg = {
      from: "g.basbug@hotmail.com",
      to: newUser.email,
      subject: "E-commerce - verify mail",
      text: `
      Hello, thanks for registering on my project.
      Please copy and paste the address below to verify your account.
      link: http://localhost:8080/activation
      Code: ${newUser.emailToken}
      `,
      html: `
      <h2>Hello,</h2>
      <p>Thanks for registering on my project.</p>
      <p>Please copy and paste the address below to verify your account.</p>
      <a href="http://localhost:8080/activation"><strong>Activation Link</strong></a>
      <p><strong>Activation Code: </strong>${newUser.emailToken}</p>
      `,
    };
    // ENG: Send mail & TR: Mail gönderme
    try {
      await sgMail.send(msg)
    } catch (err) {
      console.log(`Mail gönderilemedi: ${err}`);
    }
  }
});

/**
 * @route POST /users/verify-email
 * @desc Activate user account
 * @access Public
 */

router.post("/users/verify-email", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User is not found.",
      });
    } else if (user.emailToken == null) {
      return res.status(400).json({
        success: false,
        msg: "Already activated your account.",
      });
    }
    user.emailToken = null;
    user.isVerified = true;
    user.save().then(() => {
      return res.status(201).json({
        success: true,
        msg: "Successfully activated.",
      });
    });
  } catch (err) {
    console.log(`Verify Error: ${err}`);
  }
});

/**
 * @route POST /users/reset-request
 * @desc Reset Password mail
 * @access Public
 */
router.post("/users/reset-request", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
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
  }
  user.resetToken = Math.floor(Math.random() * (999999 - 100000) + 100000);
  user.save().then(() => {
    res.status(201).json({
      success: true,
      msg: "Mail sending.Check your mail and click link.",
    });
  });
  // ENG: Reset password mail & TR: Parola sıfırlama maili
  const msg = {
    from: "g.basbug@hotmail.com",
    to: user.email,
    subject: "E-commerce - Reset Password",
    text: `
        Please copy and paste the address below to reset password your account.
        link: http://localhost:8080/reset-password
        Reset Code: ${user.resetToken}
        `,
    html: `
        <h2>Hello,</h2>
        <>Please copy and paste the address below to reset your account.</>
        <a href="http://localhost:8080/reset-password"><strong>Reset Password Link</strong></a>
        <p><strong>Reset Code: </strong>${user.resetToken}</p>
        `,
  };
  // ENG: Send mail & TR: Mail gönderme
  try {
    // await sgMail.send(msg)
  } catch (err) {
    console.log(`Mail gönderilemedi: ${err}`);
  }
});

/**
 * @route POST /users/reset-password
 * @desc Reset Password
 * @access Public
 */
router.post("/users/reset-password", async (req, res) => {
  const user = await UserModel.findOne({ resetToken: req.body.resetToken });
  if (!user) {
    return res.status(400).json({
      success: false,
      msg: "User is not found.",
    });
  }
  const { newPassword, confirmNewPassword } = req.body;
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      success: false,
      msg: "Passwords are not equal",
    });
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPassword, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.resetToken = null
      user.save().then((user) => {
        return res.status(201).json({
          success: true,
          msg: "Successfully. Password is changed.",
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
router.post("/users/login", (req, res) => {
  UserModel.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "User is not found.",
        success: false,
      });
    } else if (user.isVerified == false) {
      return res.status(404).json({
        msg: "User is not activated. Please check your mail.",
        success: false,
      });
    }
    // ENG: If there is user we are now going to compare the password & TR: Eğer email kayıtlı ise password şifreleri kontrol edilecek
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // ENG: User's password is correct and we need to send Json token for user & TR: Parola doğru ise json token verilecek
        const payload = {
          _id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
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
              user: user,
              token: `Bearer ${token}`,
              msg: null,
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "Incorrect password.",
          success: false,
        });
      }
    });
  });
});

/**
 * @route POST /users/profile
 * @desc Return the User's data
 * @access Private
 */
router.get("/users/profile",passport.authenticate("jwt", {session: false,}),(req, res) => {
    return res.json({
      user: req.user,
    });
  }
);

module.exports = router;
