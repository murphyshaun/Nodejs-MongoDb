const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const {JWT_SECRET} = require('../configs')
const User = require('../models/User')

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)

        if (!user) return done(null, false);

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))
