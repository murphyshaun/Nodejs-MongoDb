const express = require('express')
const apiUserRouter = express.Router();

const userController = require('../controllers/user')

const {validateParam, schemas} = require('../helpers/routerHelpers')

// router.route('/users')
//         .get(userController.getAllUser)
//         .post(userController.newUser)

apiUserRouter.get('/users',userController.getAllUser)

apiUserRouter.post('/create-user',userController.newUser)

apiUserRouter.route('/user/:userId')
                .get(validateParam(schemas.idSchema, "userId"), userController.getUserById)
                .put(userController.replaceUser)//put: replace user
                .patch(userController.updateUser)//patch: update user

apiUserRouter.route('/user/:userId/decks')
        .get(userController.getUserDecks)
        .post(userController.newUserDeck)

module.exports = apiUserRouter