import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post,    setPost]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [favorito, setFavorito] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`)
        setPost(res.data)
      } catch (err) {
        setError('No se pudo cargar el producto')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleFavorito = async () => {
    try {
      if (favorito) {
        await api.delete(`/favorites/${id}`)
        setFavorito(false)
      } else {
        await api.post(`/favorites/${id}`)
        setFavorito(true)
      }
    } catch (err) {
      console.error('Error al actualizar favorito')
    }
  }

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#F5C518' }}/>
      <p className="mt-2 text-muted">Cargando producto...</p>
    </div>
  )

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger">{error}</div>
      <button className="btn btn-outline-dark"
              onClick={() => navigate('/gallery')}>
        ← Volver a la tienda
      </button>
    </div>
  )

  return (
    <div className="container my-4">

      <nav className="mb-3">
        <span
          className="text-muted small"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/gallery')}
        >
          ← Volver a la tienda
        </span>
      </nav>

      <div className="row g-4">

        <div className="col-md-6">
          <img
            src={post.image || 'https://via.placeholder.com/600x400?text=Sin+imagen'}
            alt={post.title}
            className="img-fluid rounded shadow"
            style={{ width: '100%', height: '380px', objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-6">

          <span className="badge mb-2 fw-bold"
                style={{ backgroundColor: '#F5C518', color: '#000' }}>
            {post.category}
          </span>

          <h2 className="fw-bold" style={{ color: '#1B2A6B' }}>
            {post.title}
          </h2>

          <h3 className="fw-bold" style={{ color: '#E8851A' }}>
            ${Number(post.price).toLocaleString('es-CL')}
          </h3>

          <hr />

          <p className="text-muted">{post.description}</p>

          {post.location && (
            <p className="text-muted small">
              📍 {post.location}
            </p>
          )}

          <hr />

          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="rounded-circle d-flex align-items-center
                            justify-content-center fw-bold text-dark"
                 style={{ width: '42px', height: '42px',
                          backgroundColor: '#F5C518', flexShrink: 0 }}>
              {post.seller_name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <div className="fw-bold">{post.seller_name}</div>
              <div className="text-muted small">Vendedor</div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className={`btn fw-bold ${
                favorito ? 'btn-danger' : 'btn-outline-danger'
              }`}
              onClick={handleFavorito}
            >
              {favorito ? '❤️ Guardado' : '🤍 Agregar a favoritos'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail