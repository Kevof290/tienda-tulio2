import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, updateQuantity, totalItems, totalPrice } = useCart();
  const { user } = useAuth();

  if (cart.length === 0)
    return (
      <div className="container text-center py-5">
        <h2 className="fw-bold mb-3" style={{ color: "#1B2A6B" }}>
          🛒 Tu carrito está vacío
        </h2>
        <p className="text-muted mb-4">Agrega productos desde la tienda</p>
        <button
          className="btn btn-warning fw-bold"
          onClick={() => navigate("/gallery")}
        >
          Ver tienda →
        </button>
      </div>
    );

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4" style={{ color: "#1B2A6B" }}>
        🛒 Tu carrito ({totalItems} productos)
      </h2>

      <div className="row g-4">
        <div className="col-md-8">
          {cart.map((item) => (
            <div key={item.id} className="card shadow-sm border-0 mb-3">
              <div className="card-body d-flex align-items-center gap-3">

                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.title}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <div className="flex-grow-1">
                  <h6 className="fw-bold mb-1" style={{ color: "#1B2A6B" }}>
                    {item.title}
                  </h6>
                  <p className="text-muted small mb-1">
                    Vendedor: {item.seller_name}
                  </p>
                  <p className="fw-bold mb-0" style={{ color: "#E8851A" }}>
                    ${Number(item.price * item.quantity).toLocaleString("es-CL")}
                    {item.quantity > 1 && (
                      <span className="text-muted fw-normal small ms-2">
                        (${Number(item.price).toLocaleString("es-CL")} c/u)
                      </span>
                    )}
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    style={{ width: '32px', height: '32px', padding: 0 }}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    −
                  </button>

                  <span className="fw-bold px-1">{item.quantity}</span>

                  <button
                    className="btn btn-outline-dark btn-sm"
                    style={{ width: '32px', height: '32px', padding: 0 }}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>

              </div>
            </div>
          ))}

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: "#1B2A6B" }}>
                Resumen del pedido
              </h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Productos ({totalItems})</span>
                <span>${Number(totalPrice).toLocaleString("es-CL")}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Envío</span>
                <span className="text-success">Gratis</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-5" style={{ color: "#E8851A" }}>
                  ${Number(totalPrice).toLocaleString("es-CL")}
                </span>
              </div>

              <button
                className="btn w-100 fw-bold"
                style={{ backgroundColor: "#F5C518" }}
                onClick={() =>
                  user ? navigate("/checkout") : navigate("/login")
                }
              >
                {user ? "Proceder al pago →" : "Inicia sesión para pagar →"}
              </button>

              <button
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={() => navigate("/gallery")}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;