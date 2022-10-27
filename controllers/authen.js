const User = require('../models/User')
const {encodedToken} = require('../helpers/generator')

exports.signUp = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.value.body 

        const newUser = new User(req.value.body)
        // const newUser = new User({firstName, lastName, email, password})

        //check if there is a user with same user
        const existUser = await User.findOne({email})

        if (existUser) throw new Error('Email is already in use.')

        await newUser.save()

        let token = encodedToken(newUser._id);

        //token if encrypt then they can returned by json
        // return res.status(200).json({token})
        res.setHeader('token', token)
        return res.status(200).json({success: true})
    } catch (error) {
        next(error)
    }
    
}
exports.signIn = (req, res, next) => {
    console.log('signin');
}
exports.secret = (req, res, next) => {
    console.log('secret');
}