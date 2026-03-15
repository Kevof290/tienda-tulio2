import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import logo from '../assets/img/logo.png'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name:     '',
    email:    '',
    password: '',
    picture:  ''
  })
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(false)

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
      await api.post('/users/register', formData)
      navigate('/login')

    } catch (err) {
      setError('Error al registrarse, intenta de nuevo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">

            <div className="card-header fw-bold fs-5 d-flex align-items-center gap-2"
                 style={{ backgroundColor: '#F5C518', color: '#000' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: '40px', objectFit: 'contain' }}
              />
              <div>
                La Tienda de Tulio
                <div className="fw-normal fs-6">Registrarse</div>
              </div>
            </div>

            <div className="card-body p-4">

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Títere promedio"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="conejo.rojo@titirilquen.cl"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Avatar URL <span className="text-muted fw-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    name="picture"
                    className="form-control"
                    placeholder="https://mi-foto.com/avatar.jpg"
                    value={formData.picture}
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
                    {loading ? 'Registrando...' : 'Registrarme'}
                  </button>
                  <Link to="/" className="btn btn-outline-secondary">
                    Volver
                  </Link>
                </div>

              </form>

              <hr />
              <p className="text-center mb-0 small">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login"
                      className="fw-bold"
                      style={{ color: '#1B2A6B' }}>
                  Inicia sesión
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register