const router = require('express').Router()
const { verificarToken } = require('../middlewares')
const {
  getFavoritesByUser,
  addFavorite,
  deleteFavorite
} = require('../consultas')

router.get('/', verificarToken, async (req, res) => {
  try {
    const favorites = await getFavoritesByUser(req.user.id)
    res.json(favorites)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener favoritos' })
  }
})

router.post('/:postId', verificarToken, async (req, res) => {
  try {
    const favorite = await addFavorite(req.user.id, req.params.postId)
    res.status(201).json({ message: 'Agregado a favoritos', favorite })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Ya está en favoritos' })
    }
    res.status(500).json({ error: 'Error al agregar favorito' })
  }
})

router.delete('/:postId', verificarToken, async (req, res) => {
  try {
    await deleteFavorite(req.user.id, req.params.postId)
    res.json({ message: 'Eliminado de favoritos' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar favorito' })
  }
})

module.exports = router