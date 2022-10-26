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

module.exports = {
    getAllUser: getAllUserPromises,
    newUser: newUserPromises,
}