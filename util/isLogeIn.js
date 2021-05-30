const jwt = require('jsonwebtoken')



module.exports = async (req, res, next) => {
    try {
        let decoded = jwt.verify(req.headers.token, 'secret')
        req.user = decoded.user
        next()

    } catch (eroor) {
        res.json({ name: eroor.name, message: eroor.message })
        next()
    }
}
