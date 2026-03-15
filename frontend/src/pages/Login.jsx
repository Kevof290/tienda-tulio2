import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import logo from '../assets/img/logo.png'

const Login = () => {
  const { login } = useAuth()
  const navigate  = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await api.post('/users/login', { email, password })
      login(res.data.user, res.data.token)
      navigate('/gallery')

    } catch (err) {
      setError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">

            <div className="card-header fw-bold fs-5"
                 style={{ backgroundColor: '#F5C518', color: '#000' }}>
                  <img
                src={logo}
                alt="Logo"
                style={{ height: '40px', objectFit: 'contain', padding : '0 10px 5px 0' }}
              />
                La Tienda de Tulio
              <div className="fw-normal fs-6">Iniciar sesión</div>
            </div>

            <div className="card-body p-4">

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="conejo.rojo@titirilquen.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    className="form-control"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn fw-bold"
                    style={{ backgroundColor: '#F5C518' }}
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Iniciar Sesión'}
                  </button>
                  <Link to="/" className="btn btn-outline-secondary">
                    Volver
                  </Link>
                </div>

              </form>

              <hr />
              <p className="text-center mb-0 small">
                ¿No tienes cuenta?{' '}
                <Link to="/register"
                      className="fw-bold"
                      style={{ color: '#1B2A6B' }}>
                  Regístrate gratis
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login