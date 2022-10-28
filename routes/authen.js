const express = require('express')
const apiUserRouter = express.Router();
const {validateParam, schemas, validateBody} = require('../helpers/routerHelpers')
const authenController = require('../controllers/authen')
const passport = require('passport')
require('../middlewares/passport')

apiUserRouter.post('/auth/google', passport.authenticate('google-plus-token' , {session: false}), authenController.authGoogle)

apiUserRouter.post('/signup', validateBody(schemas.authenSignUpSchema), authenController.signUp)

apiUserRouter.post('/signin', validateBody(schemas.authenSignInSchema), passport.authenticate('local', {session: false}),authenController.signIn)

apiUserRouter.get('/secret', passport.authenticate('jwt', {session: false}), authenController.secret)

module.exports = apiUserRouter
