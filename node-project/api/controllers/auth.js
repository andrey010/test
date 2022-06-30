const db = require('../../database/models/index')
const { validationError } = require('../../helpers/functions')
const { validatePassword } = require('../../helpers/security')

class AuthController {

    async login(req, res, next) {
        //console.log(db.sequelize.models)
        try {
            const user = await db.sequelize.models.Users.findOne({where: {user_name: req.body.user_name}})
            const isMatch = await validatePassword(req.body.password, user.password)
            // if (!isMatch) {
            //     return validationError('Invalid password!', next)       
            // }
            req.session.isLogged=true
            console.log(req.session)

            return res.json({data: user})
        } catch (e) {
            next(e)
        }
    }
    
    async logout(req, res, next) {
        req.session.destroy()
        res.json({message: 'Logout'})
    }

    async isLogin(req, res, next) {
        res.json({isLogged: req.session.isLogged || false})
    }
}

module.exports = new AuthController()