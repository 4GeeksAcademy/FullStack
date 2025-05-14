import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const LayoutHeader = () => {
  const { store, actions } = useContext(Context);
  const [location, setLocation] = useState("Madrid");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoggingOut, setShowLoggingOut] = useState(false);
  const navigate = useNavigate();

  const cartItems = store.cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cartItems");

    if (token && storedUser) {
      setIsLoggedIn(true);
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      // detect admin role (normalize to lowercase)
      const role = (parsed.role || "").toString().toLowerCase();
      setUser({ ...parsed, isAdmin: role === "administrador" || role === "admin" });
      if (storedCart) {
        actions.setCartItems(JSON.parse(storedCart));
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      actions.setCartItems([]);
    }
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Desconocido";
            setLocation(city);
          } catch (error) {
            console.error("Error obteniendo la ubicación:", error);
            alert("No se pudo obtener la ubicación");
          }
        },
        (error) => {
          console.error("Error de geolocalización:", error);
          alert("Error al obtener su ubicación");
        }
      );
    } else {
      alert("La geolocalización no es soportada por este navegador.");
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
    setTimeout(() => {
      handleLogout();
    }, 1500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky-top bg-white shadow-sm">
        <div className="container d-flex align-items-center py-3 flex-wrap">
          <div
            className="d-flex align-items-center me-auto me-md-4"
            role="button"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-house-fill fs-2 text-danger me-2"></i>
            <h1 className="fs-4 fw-bold mb-0">GroupOn</h1>
          </div>

          <div className="d-flex d-md-none align-items-center gap-3 order-md-last">
            <Link to="/cart" className="position-relative" role="button">
              <i className="bi bi-cart fs-4 text-dark"></i>
              {cartItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle p-0 border-0"
                  id="userDropdownMobile"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle fs-4 text-dark"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdownMobile">
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/crear-servicio">Crear Servicio</Link></li>
                  <li><Link className="dropdown-item" to="/mis-compras">Mis Compras</Link></li>
                  <li><Link className="dropdown-item" to="/mis-reservas">Reservas de mi Servicio</Link></li>

                  {user.isAdmin && (
                    <li><Link className="dropdown-item" to="/admin">Panel Admin</Link></li>
                  )}
                  {user.isAdmin && (
                    <li><Link className="dropdown-item" to="/newsletter">Newsletter</Link></li>
                  )}

                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={() => setShowLogoutModal(true)}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" role="button">
                <i className="bi bi-person-circle fs-4 text-dark"></i>
              </Link>
            )}

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list fs-3"></i>
            </button>
          </div>

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
                <i className="bi bi-geo-alt-fill me-2 text-secondary"></i>
                <span className="text-muted small">{location}</span>
              </div>
            </form>

            <div className="d-none d-md-flex align-items-center gap-3 ms-auto">
              <Link to="/cart" className="position-relative" role="button">
                <i className="bi bi-cart fs-4 text-dark"></i>
                {cartItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn btn-link dropdown-toggle p-0 border-0"
                    id="userDropdownDesktop"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle fs-4 text-dark"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdownDesktop">
                    <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                    <li><Link className="dropdown-item" to="/crear-servicio">Crear Servicio</Link></li>
                    <li><Link className="dropdown-item" to="/mis-compras">Mis Compras</Link></li>
                    <li><Link className="dropdown-item" to="/mis-reservas">Reservas de mi Servicio</Link></li>

                    {user.isAdmin && (
                      <li><Link className="dropdown-item" to="/admin">Panel Admin</Link></li>
                    )}
                    {user.isAdmin && (
                      <li><Link className="dropdown-item" to="/newsletter">Newsletter</Link></li>
                    )}

                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={() => setShowLogoutModal(true)}>Cerrar Sesión</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" role="button">
                  <i className="bi bi-person-circle fs-4 text-dark"></i>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav p-3 border-top">
            <li className="nav-item py-2">
              <Link className="nav-link" to="/top" onClick={() => actions.setCategory("top")}>
                Ofertas del día
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link" to="/gastronomia" onClick={() => actions.setCategory("food")}>
                Restaurantes
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link" to="/belleza" onClick={() => actions.setCategory("beauty")}>
                Belleza y spa
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link className="nav-link" to="/viajes" onClick={() => actions.setCategory("travel")}>
                Viajes
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {showLogoutModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h5>¿Cerrar sesión?</h5>
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="btn btn-danger" onClick={confirmLogout}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      )}

      {showLoggingOut && (
        <div style={styles.loggingOut}>
          <div className="spinner-border text-light me-2" role="status"></div>
          <span>Cerrando sesión...</span>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1050,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    width: "90%",
    maxWidth: "400px"
  },
  loggingOut: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1051,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    fontSize: "1rem"
  }
};

export default LayoutHeader;

