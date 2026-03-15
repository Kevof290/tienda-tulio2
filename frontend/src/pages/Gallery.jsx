import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

const Gallery = () => {
  const navigate = useNavigate()

  const [posts,    setPosts]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  const [busqueda,  setBusqueda]  = useState('')
  const [categoria, setCategoria] = useState('Todos')

  const categorias = ['Todos', 'Belleza', 'Alimentos', 'Libros', 'Juguetes']

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts')
        setPosts(res.data)
      } catch (err) {
        setError('Error al cargar los productos')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const productosFiltrados = posts.filter((post) => {
    const coincideBusqueda = post.title
      .toLowerCase()
      .includes(busqueda.toLowerCase())
    const coincideCategoria =
      categoria === 'Todos' || post.category === categoria
    return coincideBusqueda && coincideCategoria
  })

  return (
    <div className="container my-4">

      <h2 className="fw-bold mb-4" style={{ color: '#1B2A6B' }}>
        🛍️ Tienda
      </h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2 flex-wrap mb-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm fw-bold ${
              categoria === cat
                ? 'btn-dark'
                : 'btn-outline-dark'
            }`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border"
               style={{ color: '#F5C518' }}/>
          <p className="mt-2 text-muted">Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {!loading && !error && productosFiltrados.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No se encontraron productos 😔</p>
        </div>
      )}

      {!loading && !error && (
        <div className="row g-3">
          {productosFiltrados.map((post) => (
            <div key={post.id} className="col-12 col-md-4 col-lg-3">
              <ProductCard
                post={post}
                onClick={() => navigate(`/product/${post.id}`)}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Gallery