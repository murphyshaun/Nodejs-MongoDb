const JWT = require('jsonwebtoken')
const {JWT_SECRET} = require('../configs')

exports.encodedToken = (userId) => {
    return JWT.sign({
        iss: 'shaun',
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3) //token expire three days later
    }, JWT_SECRET)
}