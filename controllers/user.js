const User = require('../models/User')

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
        const newUser = new User(req.body)
        await newUser.save()
        return res.status(200).json({newUser})
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const {userId} = req.params
        const user = await User.findById(userId);
        return res.status(200).json({user})
    } catch (error) {
        next(error)
    }
    
}

const replaceUser = async (req, res, next) => {
    try {
        //enforce new user to old user
        const {userId} = req.params

        const newUser = req.body

        const result = await User.findByIdAndUpdate(userId, newUser);

        return res.status(200).json({success: true})
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        //enforce new user to old user
        const {userId} = req.params

        const newUser = req.body

        const result = await User.findByIdAndUpdate(userId, newUser);

        return res.status(200).json({success: true})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUser: getAllUserAsync,
    newUser: newUserAsync,
    getUserById,
    replaceUser,
    updateUser,
}