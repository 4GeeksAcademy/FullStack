// src/front/js/component/LayoutHeader.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { jwtDecode } from "jwt-decode";


const LayoutHeader = () => {
  const { store, actions } = useContext(Context);
  const [location, setLocation] = useState("Madrid");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoggingOut, setShowLoggingOut] = useState(false);
  const navigate = useNavigate();
  const toggleRef = useRef(null);

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      if (typeof exp !== "number") return true;
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  };

  const handleProtectedNav = (path) => {
    // cierra dropdown
    const dropdown = toggleRef.current?.closest(".dropdown");
    if (dropdown) {
      const btn = dropdown.querySelector('[data-bs-toggle="dropdown"]');
      const inst =
        window.bootstrap.Dropdown.getInstance(btn) ||
        new window.bootstrap.Dropdown(btn);
      inst.hide();
    }
    if (!isTokenValid()) {
      localStorage.clear();
      navigate("/");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("cartItems", JSON.stringify(store.cartItems));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    actions.setCartItems([]);
    setIsLoggedIn(false);
    setUser(null);
    setShowLoggingOut(false);
    navigate("/");
  };
  const confirmLogout = () => {
    setShowLogoutModal(false);
    setShowLoggingOut(true);
    setTimeout(handleLogout, 1500);
  };

  useEffect(() => {
    document
      .querySelectorAll('[data-bs-toggle="dropdown"]')
      .forEach((btn) => new window.bootstrap.Dropdown(btn));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cartItems");
    if (token && storedUser) {
      setIsLoggedIn(true);
      const parsed = JSON.parse(storedUser);
      const role = (parsed.role || "").toLowerCase();
      setUser({
        ...parsed,
        isAdmin: role === "administrador" || role === "admin",
      });
      if (storedCart) actions.setCartItems(JSON.parse(storedCart));
    } else {
      setIsLoggedIn(false);
      setUser(null);
      actions.setCartItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocalización no soportada");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
          );
          const data = await res.json();
          setLocation(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              "Desconocido"
          );
        } catch {
          alert("No se pudo obtener la ubicación");
        }
      },
      () => alert("Error al obtener ubicación")
    );
  };

  const cartCount = store.cartItems.reduce(
    (sum, i) => sum + (i.quantity || 1),
    0
  );

  return (
    <>
      <header className="sticky-top bg-white shadow-sm">
        <div className="container d-flex align-items-center py-3 flex-wrap">

          {/* LOGO */}
          <div
            className="d-flex align-items-center me-auto me-md-4"
            role="button"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-house-fill fs-2 text-danger me-2" />
            <h1 className="fs-4 fw-bold mb-0">GroupOn</h1>
          </div>

          {/* MOBILE CART + USER */}
          <div className="d-flex d-md-none align-items-center gap-3 order-md-last">
            <button
              className="position-relative btn btn-link p-0"
              onClick={() => navigate("/cart")}
            >
              <i className="bi bi-cart fs-4 text-dark" />
              {cartCount > 0 && (
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="dropdown" data-bs-auto-close="outside">
                <button
                  ref={toggleRef}
                  className="btn btn-link dropdown-toggle p-0 border-0"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle fs-4 text-dark" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleProtectedNav("/perfil")}
                    >
                      Mi Perfil
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleProtectedNav("/crear-servicio")}
                    >
                      Crear Servicio
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleProtectedNav("/mis-compras")}
                    >
                      Mis Compras
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleProtectedNav("/mis-reservas")}
                    >
                      Mis Reservas
                    </button>
                  </li>
                  {user.isAdmin && (
                    <>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleProtectedNav("/admin")}
                        >
                          Panel Admin
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleProtectedNav("/newsletter")}
                        >
                          Newsletter
                        </button>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-link p-0"
                onClick={() => navigate("/login")}
              >
                <i className="bi bi-person-circle fs-4 text-dark" />
              </button>
            )}

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <i className="bi bi-list fs-3" />
            </button>
          </div>

          {/* DESKTOP SEARCH + CART + USER */}
          <div className="d-flex flex-column flex-md-row flex-grow-1 align-items-md-center mt-3 mt-md-0">
            <form
              className="d-flex flex-grow-1 align-items-center me-md-4"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                className="form-control me-2 rounded-pill"
                placeholder="Busca restaurantes, spas, actividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                className="d-flex align-items-center bg-light px-3 py-2 rounded-pill"
                style={{ cursor: "pointer" }}
                onClick={handleGetLocation}
              >
                <i className="bi bi-geo-alt-fill me-2 text-secondary" />
                <span className="text-muted small">{location}</span>
              </div>
            </form>

            <div className="d-none d-md-flex align-items-center gap-3 ms-auto">
              <button
                className="position-relative btn btn-link p-0"
                onClick={() => navigate("/cart")}
              >
                <i className="bi bi-cart fs-4 text-dark" />
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <div className="dropdown" data-bs-auto-close="outside">
                  <button
                    ref={toggleRef}
                    className="btn btn-link dropdown-toggle p-0 border-0"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle fs-4 text-dark" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleProtectedNav("/perfil")}
                      >
                        Mi Perfil
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleProtectedNav("/crear-servicio")}
                      >
                        Crear Servicio
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleProtectedNav("/mis-compras")}
                      >
                        Mis Compras
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleProtectedNav("/mis-reservas")}
                      >
                        Mis Reservas
                      </button>
                    </li>
                    {user.isAdmin && (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleProtectedNav("/admin/users")}
                          >
                            Panel Admin
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleProtectedNav("/newsletter")}
                          >
                            Newsletter
                          </button>
                        </li>
                      </>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setShowLogoutModal(true)}
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate("/login")}
                >
                  <i className="bi bi-person-circle fs-4 text-dark" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav p-3 border-top">
            <li className="nav-item py-2">
              <button
                className="nav-link btn btn-link"
                onClick={() => actions.setCategory("top")}
              >
                Ofertas del día
              </button>
            </li>
            <li className="nav-item py-2">
              <button
                className="nav-link btn btn-link"
                onClick={() => actions.setCategory("food")}
              >
                Restaurantes
              </button>
            </li>
            <li className="nav-item py-2">
              <button
                className="nav-link btn btn-link"
                onClick={() => actions.setCategory("beauty")}
              >
                Belleza y spa
              </button>
            </li>
            <li className="nav-item py-2">
              <button
                className="nav-link btn btn-link"
                onClick={() => actions.setCategory("travel")}
              >
                Viajes
              </button>
            </li>
          </ul>
        </div>
      </header>

      {showLogoutModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h5>¿Cerrar sesión?</h5>
            <p>¿Estás seguro?</p>
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoggingOut && (
        <div style={styles.loggingOut}>
          <div className="spinner-border text-light me-2" role="status" />
          <span>Cerrando sesión...</span>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1050,
  },
  modal: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    width: "90%",
    maxWidth: "400px",
  },
  loggingOut: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0,0,0,0.85)",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "12px",
    display: "flex", alignItems: "center",
    zIndex: 1051,
  },
};

export default LayoutHeader;





