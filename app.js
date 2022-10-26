const express = require('express')
const logger = require('morgan')
const mongoClient = require('mongoose')

//setup connect mongodb by mongoose
mongoClient.connect('mongodb://localhost:27017/nodejs-api-starter')
            .then(() => console.log('Connect to db is success'))
            .catch((error) => console.error(`Connect to db is fail ${error}`))

const app = express()

const userRoutes = require('./routes/user')

//Middleware
app.use(logger('dev'))


//Routes
app.use(userRoutes)

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!!!'
    })
})

//Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

//Error handler function
app.use((err) => {
    const error = app.get('env') === 'development' ? err : {}

    const status = error.status || 500

    //response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

//start the server
const port = app.get('port') || 3000

app.listen(port, () => console.log(`Server is listening on port ${port}`))