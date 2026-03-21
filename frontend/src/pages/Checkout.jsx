import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, totalPrice, clearCart } = useCart()

  const [formData, setFormData] = useState({
    nombre:    '',
    email:     '',
    direccion: '',
    ciudad:    '',
    telefono:  ''
  })
  const [confirmado, setConfirmado] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setConfirmado(true)
    clearCart()
  }

  if (confirmado) return (
    <div className="container text-center py-5">
      <div className="mb-4" style={{ fontSize: '5rem' }}>🎉</div>
      <h2 className="fw-bold mb-3" style={{ color: '#1B2A6B' }}>
        ¡Pedido confirmado!
      </h2>
      <p className="text-muted mb-2">
        Gracias por tu compra en La Tienda de Tulio
      </p>
      <p className="text-muted mb-4">
        Recibirás un correo con los detalles de tu pedido
      </p>
      <button
        className="btn btn-warning fw-bold"
        onClick={() => navigate('/')}
      >
        Volver al inicio
      </button>
    </div>
  )

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4" style={{ color: '#1B2A6B' }}>
        💳 Checkout
      </h2>

      <div className="row g-4">

        <div className="col-md-7">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#1B2A6B' }}>
                Datos de envío
              </h5>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold"
                         style={{ color: '#1B2A6B' }}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    className="form-control"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold"
                           style={{ color: '#1B2A6B' }}>
                      Ciudad
                    </label>
                    <input
                      type="text"
                      name="ciudad"
                      className="form-control"
                      value={formData.ciudad}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold"
                           style={{ color: '#1B2A6B' }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      className="form-control"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-bold mt-2"
                  style={{ backgroundColor: '#F5C518' }}
                >
                  Confirmar pedido 🎉
                </button>

              </form>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#1B2A6B' }}>
                Tu pedido
              </h5>

              {cart.map((item) => (
                <div key={item.id}
                     className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="small fw-bold">
                    ${Number(item.price * item.quantity)
                      .toLocaleString('es-CL')}
                  </span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <span className="fw-bold">Total</span>
                <span className="fw-bold" style={{ color: '#E8851A' }}>
                  ${Number(totalPrice).toLocaleString('es-CL')}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout