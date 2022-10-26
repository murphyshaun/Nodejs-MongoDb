const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.route('/users')
        .get(userController.getAllUser)
        .post(userController.newUser)

module.exports = router