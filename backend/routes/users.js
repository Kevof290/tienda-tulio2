const router  = require('express').Router()
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const secretKey           = require('../secretKey')
const { verificarToken }  = require('../middlewares')
const {
  getUserByEmail,
  createUser,
  getUserById,
  updateUser
} = require('../consultas')

router.post('/register', async (req, res) => {
  const { name, email, password, picture } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(name, email, hashedPassword, picture)
    res.status(201).json({ message: 'Usuario creado', user })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      secretKey,
      { expiresIn: '24h' }
    )
    res.json({
      token,
      user: {
        id:      user.id,
        name:    user.name,
        email:   user.email,
        picture: user.picture
      }
    })
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})

router.get('/profile', verificarToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.id)
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
})

router.put('/profile', verificarToken, async (req, res) => {
  const { name, email, picture } = req.body
  try {
    const user = await updateUser(req.user.id, name, email, picture)
    res.json({ message: 'Perfil actualizado', user })
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar perfil' })
  }
})

module.exports = router