import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Profile = () => {
  const { user, logout, login } = useAuth();  // ← agrega login
  const navigate = useNavigate();

  const [misPosts,    setMisPosts]    = useState([]);
  const [favoritos,   setFavoritos]   = useState([]);
  const [tabActiva,   setTabActiva]   = useState("publicaciones");
  const [loading,     setLoading]     = useState(true);

  // ── Estados del editor de perfil ──
  const [editando,    setEditando]    = useState(false);
  const [savingPerfil, setSavingPerfil] = useState(false);
  const [formPerfil,  setFormPerfil]  = useState({
    name:    user?.name    || "",
    email:   user?.email   || "",
    picture: user?.picture || ""
  });

  useEffect(() => {
  if (!user) return;

  const fetchData = async () => {
    try {
      const [postsRes, favsRes] = await Promise.all([
        api.get("/posts/user/mine"),
        api.get("/favorites"),
      ]);

      setMisPosts(postsRes.data);
      setFavoritos(favsRes.data);

    } catch (err) {
      console.error("Error al cargar datos del perfil");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEliminarPost = async (postId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta publicación?")) return;
    try {
      await api.delete(`/posts/${postId}`);
      setMisPosts(misPosts.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Error al eliminar publicación");
    }
  };

  const handleEditarPerfil = async (e) => {
    e.preventDefault();
    setSavingPerfil(true);
    try {
      const res = await api.put("/users/profile", formPerfil);
      // Actualiza el contexto con los nuevos datos
      login(res.data.user, sessionStorage.getItem("token"));
      setEditando(false);
    } catch (err) {
      console.error("Error al actualizar perfil");
    } finally {
      setSavingPerfil(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row g-4">

        {/* ── Sidebar ── */}
        <div className="col-md-3">
          <div
            className="card shadow-sm border-0 text-center p-3"
            style={{ backgroundColor: "#F5C518" }}
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt="Avatar"
                className="rounded-circle mx-auto mb-2"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="rounded-circle mx-auto mb-2 d-flex
                            align-items-center justify-content-center fw-bold fs-3"
                style={{ width: "80px", height: "80px",
                         backgroundColor: "#1B2A6B", color: "white" }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <h6 className="fw-bold mb-0">{user?.name}</h6>
            <small className="text-dark">{user?.email}</small>

            <hr />

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

            {/* Botón editar perfil */}
            <button
              className="btn btn-outline-dark btn-sm w-100 mb-2"
              onClick={() => setEditando(true)}
            >
              ✏️ Editar perfil
            </button>
            <button
              className="btn btn-dark btn-sm w-100 mb-2"
              onClick={() => navigate("/create")}
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

        {/* ── Contenido ── */}
        <div className="col-md-9">
          <div className="d-flex gap-2 mb-4">
            <button
              className={`btn btn-sm fw-bold ${
                tabActiva === "publicaciones" ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setTabActiva("publicaciones")}
            >
              📦 Mis publicaciones
            </button>
            <button
              className={`btn btn-sm fw-bold ${
                tabActiva === "favoritos" ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setTabActiva("favoritos")}
            >
              ❤️ Mis favoritos
            </button>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#F5C518" }} />
            </div>
          )}

          {!loading && tabActiva === "publicaciones" && (
            <>
              {misPosts.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <p>No tienes publicaciones aún</p>
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={() => navigate("/create")}
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
                        <button
                          className="btn btn-warning btn-sm position-absolute"
                          style={{ top: "8px", right: "48px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit/${post.id}`);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-danger btn-sm position-absolute"
                          style={{ top: "8px", right: "8px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminarPost(post.id);
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

          {!loading && tabActiva === "favoritos" && (
            <>
              {favoritos.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <p>No tienes favoritos aún</p>
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={() => navigate("/gallery")}
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

      {/* ── Modal editar perfil ── */}
      {editando && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header"
                   style={{ backgroundColor: "#F5C518" }}>
                <h5 className="modal-title fw-bold">✏️ Editar perfil</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditando(false)}
                />
              </div>

              <div className="modal-body p-4">
                <form onSubmit={handleEditarPerfil}>

                  <div className="mb-3">
                    <label className="form-label fw-bold"
                           style={{ color: "#1B2A6B" }}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formPerfil.name}
                      onChange={(e) => setFormPerfil({
                        ...formPerfil, name: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold"
                           style={{ color: "#1B2A6B" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={formPerfil.email}
                      onChange={(e) => setFormPerfil({
                        ...formPerfil, email: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold"
                           style={{ color: "#1B2A6B" }}>
                      URL de foto de perfil
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://mi-foto.com/avatar.jpg"
                      value={formPerfil.picture}
                      onChange={(e) => setFormPerfil({
                        ...formPerfil, picture: e.target.value
                      })}
                    />
                    {/* Preview avatar */}
                    {formPerfil.picture && (
                      <img
                        src={formPerfil.picture}
                        alt="Preview"
                        className="rounded-circle mt-2"
                        style={{ width: "60px", height: "60px",
                                 objectFit: "cover" }}
                        onError={(e) => e.target.style.display = "none"}
                      />
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn fw-bold"
                      style={{ backgroundColor: "#F5C518" }}
                      disabled={savingPerfil}
                    >
                      {savingPerfil ? "Guardando..." : "💾 Guardar cambios"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setEditando(false)}
                    >
                      Cancelar
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;