import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const EditPost = () => {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title:       '',
    description: '',
    price:       '',
    category:    '',
    image:       '',
    location:    ''
  })
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState(null)

  const categorias = ['Belleza', 'Alimentos', 'Libros', 'Juguetes']

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`)
        const post = res.data
        setFormData({
          title:       post.title,
          description: post.description || '',
          price:       post.price,
          category:    post.category    || '',
          image:       post.image       || '',
          location:    post.location    || ''
        })
      } catch (err) {
        setError('No se pudo cargar la publicación')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await api.put(`/posts/${id}`, formData)
      navigate('/profile')
    } catch (err) {
      setError('Error al actualizar la publicación')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#F5C518' }}/>
    </div>
  )

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <div className="mb-4">
            <h2 className="fw-bold" style={{ color: '#1B2A6B' }}>
              ✏️ Editar publicación
            </h2>
            <p className="text-muted">
              Modifica los campos que necesites
            </p>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Título del producto
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold"
                           style={{ color: '#1B2A6B' }}>
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold"
                           style={{ color: '#1B2A6B' }}>
                      Categoría
                    </label>
                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    URL de imagen
                  </label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    value={formData.image}
                    onChange={handleChange}
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 rounded"
                      style={{ height: '120px', objectFit: 'cover',
                               width: '100%' }}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn fw-bold"
                    style={{ backgroundColor: '#F5C518' }}
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : '💾 Guardar cambios'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/profile')}
                  >
                    Cancelar
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost