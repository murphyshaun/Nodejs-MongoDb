const express = require('express')
const apiUserRouter = express.Router();

const userController = require('../controllers/user')

const {validateParam, schemas, validateBody} = require('../helpers/routerHelpers')

// router.route('/users')
//         .get(userController.getAllUser)
//         .post(userController.newUser)

apiUserRouter.get('/users',userController.getAllUser)

apiUserRouter.post('/create-user', validateBody(schemas.userSchema), userController.newUser)

apiUserRouter.route('/user/:userId')
                .get(validateParam(schemas.idSchema, "userId"), userController.getUserById)
                .put(validateParam(schemas.idSchema, "userId"), validateBody(schemas.userSchema), userController.replaceUser)//put: replace user
                .patch(validateParam(schemas.idSchema, "userId"), validateBody(schemas.optionUserSchema), userController.updateUser)//patch: update user

apiUserRouter.route('/user/:userId/decks')
        .get(validateParam(schemas.idSchema, "userId"), userController.getUserDecks)
        .post(validateParam(schemas.idSchema, "userId"), validateBody(schemas.decksSchema), userController.newUserDeck)

module.exports = apiUserRouter