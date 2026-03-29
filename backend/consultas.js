const { Pool } = require('pg')
require('dotenv').config()

// ── Conexión a PostgreSQL ─────────────────────────────────────────
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false,
})

pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL'))
  .catch((err) => console.error('❌ Error conectando a PostgreSQL:', err))


const getUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0]
}

// Crear nuevo usuario (register)
const createUser = async (name, email, hashedPassword, picture) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, picture)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, picture`,
    [name, email, hashedPassword, picture]
  )
  return result.rows[0]
}

// Obtener perfil de usuario por id
const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email, picture, created_at FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

// Actualizar perfil de usuario
const updateUser = async (id, name, email, picture) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, picture = $3
     WHERE id = $4
     RETURNING id, name, email, picture`,
    [name, email, picture, id]
  )
  return result.rows[0]
}

// Obtener todas las publicaciones con nombre del vendedor
const getAllPosts = async () => {
  const result = await pool.query(
    `SELECT posts.*, users.name AS seller_name
     FROM posts
     JOIN users ON posts.user_id = users.id
     ORDER BY posts.created_at DESC`
  )
  return result.rows
}

// Obtener una publicación por id
const getPostById = async (id) => {
  const result = await pool.query(
    `SELECT posts.*,
            users.name    AS seller_name,
            users.email   AS seller_email,
            users.picture AS seller_picture
     FROM posts
     JOIN users ON posts.user_id = users.id
     WHERE posts.id = $1`,
    [id]
  )
  return result.rows[0]
}

// Obtener publicaciones de un usuario específico
const getPostsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM posts
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  )
  return result.rows
}

// Crear nueva publicación
const createPost = async (title, description, price, category, image, location, userId) => {
  const result = await pool.query(
    `INSERT INTO posts (title, description, price, category, image, location, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [title, description, price, category, image, location, userId]
  )
  return result.rows[0]
}

// Actualizar publicación
const updatePost = async (id, title, description, price, category, image, location) => {
  const result = await pool.query(
    `UPDATE posts
     SET title = $1, description = $2, price = $3,
         category = $4, image = $5, location = $6
     WHERE id = $7
     RETURNING *`,
    [title, description, price, category, image, location, id]
  )
  return result.rows[0]
}

// Eliminar publicación
const deletePost = async (id) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id])
}

// Obtener favoritos de un usuario
const getFavoritesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT posts.*, users.name AS seller_name
     FROM favorites
     JOIN posts ON favorites.post_id = posts.id
     JOIN users ON posts.user_id = users.id
     WHERE favorites.user_id = $1
     ORDER BY favorites.created_at DESC`,
    [userId]
  )
  return result.rows
}

// Agregar a favoritos
const addFavorite = async (userId, postId) => {
  const result = await pool.query(
    `INSERT INTO favorites (user_id, post_id)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, postId]
  )
  return result.rows[0]
}

// Eliminar de favoritos
const deleteFavorite = async (userId, postId) => {
  await pool.query(
    'DELETE FROM favorites WHERE user_id = $1 AND post_id = $2',
    [userId, postId]
  )
}

module.exports = {
  // Usuarios
  getUserByEmail,
  createUser,
  getUserById,
  updateUser,
  // Publicaciones
  getAllPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
  // Favoritos
  getFavoritesByUser,
  addFavorite,
  deleteFavorite,
}