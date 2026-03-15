import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const CreatePost = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title:       '',
    description: '',
    price:       '',
    category:    '',
    image:       '',
    location:    ''
  })
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(false)

  const categorias = ['Belleza', 'Alimentos', 'Libros', 'Juguetes']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await api.post('/posts', formData)
      navigate('/profile')
    } catch (err) {
      setError('Error al crear la publicación, intenta de nuevo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-7">

          {/* Cabecera */}
          <div className="mb-4">
            <h2 className="fw-bold" style={{ color: '#1B2A6B' }}>
              + Nueva publicación
            </h2>
            <p className="text-muted">
              Completa los campos para publicar tu producto
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
                    placeholder="Ej: Shampoo Platinum de Tulio"
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
                    placeholder="Describe tu producto..."
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
                      placeholder="Ej: 4990"
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
                    placeholder="https://mi-imagen.com/foto.jpg"
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
                    placeholder="Ej: Santiago, Chile"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn fw-bold"
                    style={{ backgroundColor: '#F5C518' }}
                    disabled={loading}
                  >
                    {loading ? 'Publicando...' : '📢 Publicar producto'}
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

export default CreatePost