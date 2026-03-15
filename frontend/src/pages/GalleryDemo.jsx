// Componente temporal de demostración - Galería con datos de prueba
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const GalleryDemo = () => {
  const navigate = useNavigate()

  const posts = [
    {
      id: 1,
      title: 'Shampoo Platinum de Tulio',
      description: 'El mítico shampoo de Tulio Triviño, fórmula exclusiva para cabellos rebeldes.',
      price: 4990,
      category: 'Belleza',
      image: '',
      location: 'Santiago, Chile',
      seller_name: 'Tulio Triviño'
    },
    {
      id: 2,
      title: 'Libro: La Verdad de Bodoque',
      description: 'Reportajes exclusivos de Bodoque sobre los misterios del mundo.',
      price: 8500,
      category: 'Libros',
      image: '',
      location: 'Valparaíso, Chile',
      seller_name: 'Bodoque'
    },
    {
      id: 3,
      title: 'Snack Mix de Patana',
      description: 'La mezcla secreta de snacks favorita de Patana del Monte.',
      price: 2990,
      category: 'Alimentos',
      image: '',
      location: 'Concepción, Chile',
      seller_name: 'Patana del Monte'
    },
    {
      id: 4,
      title: 'Muñeco Oficial de Tulio',
      description: 'Muñeco coleccionable oficial de Tulio Triviño, edición limitada.',
      price: 15000,
      category: 'Juguetes',
      image: '',
      location: 'Santiago, Chile',
      seller_name: 'Tienda Oficial 31 Minutos'
    },
    {
      id: 5,
      title: 'Gomina Extreme de Policarpo',
      description: 'La gomina que mantiene el pelo perfecto durante el noticiero.',
      price: 3500,
      category: 'Belleza',
      image: '',
      location: 'Santiago, Chile',
      seller_name: 'Policarpo Avendaño'
    },
    {
      id: 6,
      title: 'Polera Oficial 31 Minutos',
      description: 'Polera con el logo del noticiero más visto de Chile.',
      price: 12000,
      category: 'Juguetes',
      image: '',
      location: 'Santiago, Chile',
      seller_name: 'Tienda Oficial 31 Minutos'
    },
  ]

  const [busqueda,  setBusqueda]  = useState('')
  const [categoria, setCategoria] = useState('Todos')

  const categorias = ['Todos', 'Belleza', 'Alimentos', 'Libros', 'Juguetes']

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

      <div className="alert alert-warning d-flex align-items-center gap-2 mb-4">
        <span>⚠️</span>
        <span>
          Modo demostración — Tienda de prueba.
        </span>
      </div>

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
              categoria === cat ? 'btn-dark' : 'btn-outline-dark'
            }`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No se encontraron productos 😔</p>
        </div>
      )}

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

    </div>
  )
}

export default GalleryDemo