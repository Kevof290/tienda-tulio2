import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/img/logo.png'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar px-4 py-2"
         style={{ backgroundColor: '#F5C518' }}>
      <div className="container-fluid d-flex align-items-center">

        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="Logo La Tienda de Tulio"
            style={{ height: '40px', objectFit: 'contain' }}
          />
          <span className="fw-bold text-dark">La Tienda de Tulio</span>
        </Link>

        <div className="d-flex gap-2">
          {user ? (
            <>
              <Link to="/gallery"
                    className="btn btn-outline-dark btn-sm">
                🛍️ Tienda
              </Link>
              <Link to="/create"
                    className="btn btn-dark btn-sm fw-bold">
                + Publicar
              </Link>
              <Link to="/profile"
                    className="btn btn-outline-dark btn-sm">
                👤 {user.name}
              </Link>
              <button onClick={handleLogout}
                      className="btn btn-danger btn-sm">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                    className="btn btn-outline-dark btn-sm">
                Iniciar Sesión
              </Link>
              <Link to="/register"
                    className="btn btn-dark btn-sm fw-bold">
                Registrarse
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar