const express = require('express')
const apiUserRouter = express.Router();
const {validateParam, schemas, validateBody} = require('../helpers/routerHelpers')
const authenController = require('../controllers/authen')

apiUserRouter.post('/signup', validateBody(schemas.authenSignUpSchema), authenController.signUp)

apiUserRouter.post('/signin', validateBody(schemas.authenSignInSchema), authenController.signIn)

apiUserRouter.get('/secret', authenController./* A route that is protected by the JWT middleware. */
secret)

module.exports = apiUserRouter
