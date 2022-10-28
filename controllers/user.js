// const Joi = require('@hapi/joi')

const User = require('../models/User')
const Deck = require('../models/Deck')

// const idSchema = Joi.object().keys({
//     userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
// })
//use callback
const getAllUserCallback = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) next(err)

        return res.status(200).json({
            users
        })
    })
    
}

const newUserCallback = (req, res, next) => {
    console.log(req.body);
    
    //create object model
    const newUser = new User(req.body)
    
    newUser.save((err, user) => {
        if (err) next(err)

        return res.status(200).json({newUser})
    })
}

//use promises
const getAllUserPromises = (req, res, next) => {
    User.find({})
        .then((users) => res.status(200).json({users}))
        .catch((error) => next(error))
}

const newUserPromises = (req, res, next) => {
    //create object model
    const newUser = new User(req.body)
    newUser.save()
            .then(user => res.status(200).json({user}))
            .catch(error => next(error))
}

//user async/await
const getAllUserAsync = async (req, res, next) => {
    try {
        const users = await User.find({})

        return res.status(200).json({users})
    } catch (error) {
        next(error)
    }
}

const newUserAsync = async (req, res, next) => {
    //create object model
    try {
        const newUser = new User(req.value.body)
        await newUser.save()
        console.log(newUser);
        return res.status(200).json({newUser})
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        // const validatorResult = idSchema.validate(req.params)
        // console.log(validatorResult)
        const {userId} = req.value.params
        const user = await User.findById(userId);
        return res.status(200).json({user})
    } catch (error) {
        next(error)
    }
    
}

const replaceUser = async (req, res, next) => {
    try {
        //enforce new user to old user
        const {userId} = req.value.params

        const newUser = req.value.body

        const result = await User.findByIdAndUpdate(userId, newUser);

        return res.status(200).json({success: true})
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        //enforce new user to old user
        const {userId} = req.value.params

        const newUser = req.value.body

        const result = await User.findByIdAndUpdate(userId, newUser);

        return res.status(200).json({success: true})
    } catch (error) {
        next(error)
    }
}

const getUserDecks = async (req, res, next) => {
    const {userId} = req.value.params

    //get user
    //join decks
    const user = await User.findById(userId).populate('decks')

    return res.status(200).json({decks: user.decks})
}

const newUserDeck = async (req, res, next) => {
    const {userId} = req.value.params

    //create a new deck
    const newDeck = new Deck(req.value.body)

    //get user
    const user = await User.findById(userId)

    //assign user as a deck's owner
    newDeck.owner = user

    //save the deck
    await newDeck.save()

    //add deck to user's decks array 'decks'
    user.decks.push(newDeck._id)

    await user.save()

    return res.status(200).json({deck: newDeck})
}

module.exports = {
    getAllUser: getAllUserAsync,
    newUser: newUserAsync,
    getUserById,
    replaceUser,
    updateUser,
    getUserDecks,
    newUserDeck
}