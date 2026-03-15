const router = require('express').Router()
const { verificarToken } = require('../middlewares')
const {
  getAllPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost
} = require('../consultas')

router.get('/user/mine', verificarToken, async (req, res) => {
  try {
    const posts = await getPostsByUser(req.user.id)
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mis publicaciones' })
  }
})

router.get('/', verificarToken, async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener publicaciones' })
  }
})

router.get('/:id', verificarToken, async (req, res) => {
  try {
    const post = await getPostById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' })
    }
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener publicación' })
  }
})

router.post('/', verificarToken, async (req, res) => {
  const { title, description, price, category, image, location } = req.body
  try {
    const post = await createPost(
      title, description, price,
      category, image, location,
      req.user.id
    )
    res.status(201).json({ message: 'Publicación creada', post })
  } catch (err) {
    res.status(500).json({ error: 'Error al crear publicación' })
  }
})

router.put('/:id', verificarToken, async (req, res) => {
  const { title, description, price, category, image, location } = req.body
  try {
    const post = await updatePost(
      req.params.id,
      title, description, price,
      category, image, location
    )
    res.json({ message: 'Publicación actualizada', post })
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar publicación' })
  }
})

router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await deletePost(req.params.id)
    res.json({ message: 'Publicación eliminada' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar publicación' })
  }
})

module.exports = router