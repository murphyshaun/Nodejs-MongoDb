const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const {ExtractJwt} = require('passport-jwt')
const {JWT_SECRET, auth} = require('../configs')
const User = require('../models/User')
const {authType} = require('../enum')

//passport jwt
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

//passport local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({email})
        
        if (!user) return done(null, false)

        const isCorrectPassword = await user.isValidPassword(password)

        if (!isCorrectPassword) return done(null, false)
        
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

//passport google
passport.use(new GooglePlusTokenStrategy({
    clientID: auth.google.CLIENT_ID,
    clientSecret: auth.google.CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        //check whether this current user exists in our databases
        const user = await User.findOne({authenGoogleID: profile.id, authType: authType.google})

        if (user) return done(null, user)

        //if new account
        const newUser = new User({
            authType: authType.google,
            authenGoogleID: profile.id,
            email: profile.emails[0].value
        })

        await newUser.save()

        done(null, newUser)
    } catch (error) {
        done(error, false)
    }
}))