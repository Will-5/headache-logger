const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    const tokenReq = req.cookies?.Token


    try {
        const token = tokenReq
        const decoded = jwt.verify(token, 'rabanete')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()

    } catch {
        res.status(401).send({ errors: 'Você não está logado. Por favor realize o login' })
    }
}

module.exports = auth