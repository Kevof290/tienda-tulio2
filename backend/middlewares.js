const jwt = require('jsonwebtoken')
const secretKey = require('./secretKey')

const verificarToken = (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Formato de token inválido' })
  }

  try {
    const decoded = jwt.verify(token, secretKey)

    req.user = decoded

    next()

  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

module.exports = { verificarToken }