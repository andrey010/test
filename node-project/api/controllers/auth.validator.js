'use strict'
const Joi = require('@hapi/joi')
const { validationError } = require('../../helpers/functions');

class AuthValidator {
  async onLogin (req, res, next) {
    const schemaKeys = {
      user_name: Joi.string().required(),
      password: Joi.string().required()
    }
    const schema = Joi.object().keys(schemaKeys)
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        validationError(error, next)
    }
    return next()
  }

}

module.exports = new AuthValidator()
