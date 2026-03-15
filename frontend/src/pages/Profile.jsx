import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [misPosts,    setMisPosts]    = useState([])
  const [favoritos,   setFavoritos]   = useState([])
  const [tabActiva,   setTabActiva]   = useState('publicaciones')
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, favsRes] = await Promise.all([
          api.get('/posts/user/mine'),
          api.get('/favorites')
        ])
        setMisPosts(postsRes.data)
        setFavoritos(favsRes.data)
      } catch (err) {
        console.error('Error al cargar datos del perfil')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleEliminarPost = async (postId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta publicación?')) return
    try {
      await api.delete(`/posts/${postId}`)
      setMisPosts(misPosts.filter(p => p.id !== postId))
    } catch (err) {
      console.error('Error al eliminar publicación')
    }
  }

  return (
    <div className="container my-4">
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3"
               style={{ backgroundColor: '#F5C518' }}>

            {user?.picture ? (
              <img
                src={user.picture}
                alt="Avatar"
                className="rounded-circle mx-auto mb-2"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
            ) : (
              <div className="rounded-circle mx-auto mb-2 d-flex
                              align-items-center justify-content-center
                              fw-bold fs-3"
                   style={{ width: '80px', height: '80px',
                            backgroundColor: '#1B2A6B', color: 'white' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <h6 className="fw-bold mb-0">{user?.name}</h6>
            <small className="text-dark">{user?.email}</small>

            <hr />

            {/* Stats */}
            <div className="d-flex justify-content-around mb-3">
              <div>
                <div className="fw-bold fs-5">{misPosts.length}</div>
                <div className="small">Publicaciones</div>
              </div>
              <div>
                <div className="fw-bold fs-5">{favoritos.length}</div>
                <div className="small">Favoritos</div>
              </div>
            </div>

            {/* Botones */}
            <button
              className="btn btn-dark btn-sm w-100 mb-2"
              onClick={() => navigate('/create')}
            >
              + Nueva publicación
            </button>
            <button
              className="btn btn-danger btn-sm w-100"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>

          </div>
        </div>

        <div className="col-md-9">

          {/* Tabs */}
          <div className="d-flex gap-2 mb-4">
            <button
              className={`btn btn-sm fw-bold ${
                tabActiva === 'publicaciones' ? 'btn-dark' : 'btn-outline-dark'
              }`}
              onClick={() => setTabActiva('publicaciones')}
            >
              📦 Mis publicaciones
            </button>
            <button
              className={`btn btn-sm fw-bold ${
                tabActiva === 'favoritos' ? 'btn-dark' : 'btn-outline-dark'
              }`}
              onClick={() => setTabActiva('favoritos')}
            >
              ❤️ Mis favoritos
            </button>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border"
                   style={{ color: '#F5C518' }}/>
            </div>
          )}

          {!loading && tabActiva === 'publicaciones' && (
            <>
              {misPosts.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <p>No tienes publicaciones aún</p>
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={() => navigate('/create')}
                  >
                    + Crear primera publicación
                  </button>
                </div>
              ) : (
                <div className="row g-3">
                  {misPosts.map((post) => (
                    <div key={post.id} className="col-12 col-md-4">
                      <div className="position-relative">
                        <ProductCard
                          post={post}
                          onClick={() => navigate(`/product/${post.id}`)}
                        />
                        {/* Botón eliminar sobre la card */}
                        <button
                          className="btn btn-danger btn-sm position-absolute"
                          style={{ top: '8px', right: '8px' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEliminarPost(post.id)
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {!loading && tabActiva === 'favoritos' && (
            <>
              {favoritos.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <p>No tienes favoritos aún</p>
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={() => navigate('/gallery')}
                  >
                    Explorar tienda
                  </button>
                </div>
              ) : (
                <div className="row g-3">
                  {favoritos.map((post) => (
                    <div key={post.id} className="col-12 col-md-4">
                      <ProductCard
                        post={post}
                        onClick={() => navigate(`/product/${post.id}`)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default Profile