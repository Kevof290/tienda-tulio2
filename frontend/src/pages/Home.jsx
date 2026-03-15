import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import slide1 from "../assets/img/carrusel/slide1.jpg";
import slide2 from "../assets/img/carrusel/slide2.jpg";
import slide3 from "../assets/img/carrusel/slide3.png";

import imgBelleza from "../assets/img/categorias/belleza.png";
import imgAlimentos from "../assets/img/categorias/alimentos.png";
import imgLibros from "../assets/img/categorias/libros.png";
import imgJuguetes from "../assets/img/categorias/juguetes.png";

const Home = () => {
  const { user } = useAuth();

  const categorias = [
    {
      img: imgBelleza,
      nombre: "Belleza",
      desc: "Shampoo de Tulio y más"
    },
    {
      img: imgAlimentos,
      nombre: "Alimentos",
      desc: "Snacks de Patana"
    },
    {
      img: imgLibros,
      nombre: "Libros",
      desc: "Reportajes de Bodoque"
    },
    {
      img: imgJuguetes,
      nombre: "Juguetes",
      desc: "Muñecos del elenco"
    },
  ];

  const slides = [
    {
      img: slide1,
      titulo: "¡Bienvenido a La Tienda de Tulio!",
      sub: "Los mejores productos de 31 Minutos",
    },
    {
      img: slide2,
      titulo: "Productos únicos de tus famosos preferidos",
      sub: "Shampoo, libros, snacks y mucho más",
    },
    {
      img: slide3,
      titulo: "¿Quieres vender también?",
      sub: "Crea tu cuenta y publica gratis",
    },
  ];

  return (
    <div>
      <div
        id="carruselHome"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3500"
      >
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#carruselHome"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              style={{ backgroundColor: "#F5C518" }}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <img
                src={slide.img}
                className="d-block w-100"
                alt={slide.titulo}
                style={{ height: "480px", objectFit: "cover" }}
              />
              <div
                className="carousel-caption d-none d-md-block"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                  padding: "16px",
                }}
              >
                <h2 className="fw-bold">{slide.titulo}</h2>
                <p>{slide.sub}</p>
                {i === slides.length - 1 && !user && (
                  <Link to="/register" className="btn btn-warning fw-bold">
                    Crear cuenta gratis
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carruselHome"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carruselHome"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      <div className="container my-5">
        <h2 className="fw-bold mb-4" style={{ color: "#1B2A6B" }}>
          Categorías
        </h2>

        <div className="row g-3">
          {categorias.map((cat) => (
            <div key={cat.nombre} className="col-6 col-md-3">
              <Link to="/gallery" className="text-decoration-none">
                <div
                  className="card h-100 text-center shadow-sm border-0"
                  style={{ cursor: "pointer", overflow: "hidden" }}
                >
                  <img
                    src={cat.img}
                    alt={cat.nombre}
                    style={{
                      height: "400px",
                      width: "100%",
                      objectFit: "cover"
                    }}
                  />

                  <div className="card-body">
                    <div className="fw-bold" style={{ color: "#1B2A6B" }}>
                      {cat.nombre}
                    </div>
                    <div className="text-muted small">{cat.desc}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {!user && (
        <div
          className="py-4 text-center"
          style={{ backgroundColor: "#1B2A6B" }}
        >
          <p className="text-white mb-2 fs-5">
            ¿Quieres publicar tus propios productos?
          </p>
          <Link to="/register" className="btn btn-warning fw-bold">
            Crear cuenta gratis
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
