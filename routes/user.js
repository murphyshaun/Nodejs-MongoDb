const express = require('express')
const apiUserRouter = express.Router();

const userController = require('../controllers/user')

// router.route('/users')
//         .get(userController.getAllUser)
//         .post(userController.newUser)

apiUserRouter.get('/users',userController.getAllUser)

apiUserRouter.post('/create-user',userController.newUser)

apiUserRouter.route('/user/:userId')
                .get(userController.getUserById)
                .put(userController.replaceUser)//put: replace user
                .patch(userController.updateUser)//patch: update user




module.exports = apiUserRouter