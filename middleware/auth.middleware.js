const config = require('../config/app.config.json')
const jwt = require('jsonwebtoken')
const m$user = require('../modules/user.modules')

const userSession = async (req, res, next) => {
    let token
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]

        console.log(config.jwt.secret)
        const decoded = jwt.verify(token, config.jwt.secret)

        console.log(`decoded = ${decoded.username}`);
  
        const user = await m$user.getUserByUsername(decoded.username)
        
  
        if (user) {
          req.user = {
            username: user.data[0].username,
            password : user.data[0].password
          }
  
          next()
        } else {
          res.status(401).send({ message: 'Not authorized' })
        }
      } catch (error) {
        // console.error('Middleware user not authorized Error: ', error)
        res.status(401).send({ message: 'Not authorized Error. Token Expired.' })
      }
    }
  
    if (!token) {
      res.status(401).send({
        message: 'Not authenticated, no token'
      })
    }
}

module.exports = userSession