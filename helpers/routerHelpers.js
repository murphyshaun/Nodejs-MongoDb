const Joi = require('@hapi/joi')
const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            if (!req.value) req.value = {}

            req.value.body = validatorResult.value

            next()
        }
    }
}
const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({param: req.params[name]}) 
        
        if (validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            if (!req.value) req.value = {}

            if (!req.value.params) req.value.params = {}

            req.value.params[name] = req.params[name]
            
            next() //call controller next
        }
    }
}

const schemas = {
    authenSignUpSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    authenSignInSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    decksSchema: Joi.object().keys({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(20).required(),
    }),

    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    userSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
    }),

    optionUserSchema: Joi.object().keys({
        firstName: Joi.string().min(2),
        lastName: Joi.string().min(2),
        email: Joi.string().email(),
    }),
}
module.exports = {
    validateParam,
    schemas,
    validateBody
}