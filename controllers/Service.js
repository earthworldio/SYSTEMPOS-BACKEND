
module.exports = {
    getToken: (req) => { return req.headers.authorization.replace('Bearer ', '') },
    isLogin: (req, res, next) => {
        require('dotenv').config
        const jwt = require('jsonwebtoken')

        if (req.headers.authorization != null) {

            const token = req.headers.authorization.replace('Bearer ', '')
            const secret = process.env.secret

            try {
                const verify = jwt.verify(token, secret)
                if (verify != null) { next() }
                return
            } catch (e) {

            }
        }
        res.statusCode = 401
        return res.send('authorize fail')
    },
    getMemberId: (req) => {
        const jwt = require('jsonwebtoken')
        const token = req.headers.authorization.replace('Bearer ', '')
        const payload = jwt.decode(token)
        return payload.id
    }
}