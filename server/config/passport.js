const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/User');
const key = require('../config/keys').tokenKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            UserModel.findById(jwt_payload._id).then(user => {
                if(user) return done(null, user);
                return done(null, false);
            }).catch(err => {
                console.log(err);
            })
        })
    )
}
