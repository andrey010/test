const session = require("express-session");

const validationError = (error, next) => {
    const e = {
        message: "Validation error",
        StatusCode: 400,
        data: error
    }
    next(e)
}

const assertDatabaseConnectionOk = async (sequelize, name) => {
    try {
      await sequelize.authenticate();
      console.log(
        `Connection to database ${name} has been established successfully.`
      );
    } catch (error) {
      console.error(`Unable to connect to the database ${name}:`, error);
    }
}

const errorHandler = (error, req, res, next) => {
    console.log(error);
    const status = error.StatusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message,
        data
    })
}

const isAuth = (req, res, next) => {
  if (!req.session.isLogged) {
    const e = {
      message: "Auth error",
      StatusCode: 401,
      data: null
    }
    return next(e)
  }
  return next()
}

module.exports = {
    validationError,
    assertDatabaseConnectionOk, 
    errorHandler,
    isAuth
}