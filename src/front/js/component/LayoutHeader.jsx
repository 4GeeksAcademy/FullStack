import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

const LayoutHeader = () => {
  const { store, actions } = useContext(Context);
  const [location, setLocation] = useState("Madrid");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const cartItems = store.cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
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
          }
        },
        (error) => {
          console.error("Error de geolocalización:", error);
        }
      );
    }
  };

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => {
    setShowLogoutModal(false);
    setLoggingOut(false);
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("carrito");

      setIsLoggedIn(false);
      setUser(null);
      store.cartItems = [];

      closeLogoutModal();
      navigate("/");
    }, 1500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm !== "") {
      setSearchTerm("");
      navigate(`/search/${encodeURIComponent(trimmedTerm)}`);
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
            <h1 className="fs-4 fw-bold mb-0">GrouponClone</h1>
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
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdownMobile"
                >
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/crear-servicio">Crear Servicio</Link></li>
                  <li><Link className="dropdown-item" to="/mis-compras">Mis Compras</Link></li>
                  <li><Link className="dropdown-item" to="/mis-reservas">Reservas de mi Servicio</Link></li>
                  {user?.role === 'Administrador' && (
                    <li><Link className="dropdown-item" to="/admin/users">Panel Admin</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={openLogoutModal}>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login"><i className="bi bi-person-circle fs-4 text-dark"></i></Link>
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
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-pill-start"
                  placeholder="Busca restaurantes, spas, actividades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="btn btn-danger rounded-pill-end"
                  type="submit"
                  disabled={!searchTerm.trim()}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>

              <div
                className="d-flex align-items-center bg-light px-3 py-2 rounded-pill ms-2"
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
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdownDesktop"
                  >
                    <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                    <li><Link className="dropdown-item" to="/crear-servicio">Crear Servicio</Link></li>
                    <li><Link className="dropdown-item" to="/mis-compras">Mis Compras</Link></li>
                    <li><Link className="dropdown-item" to="/mis-reservas">Reservas de mi Servicio</Link></li>
                    {user?.role === 'Administrador' && (
                      <li><Link className="dropdown-item" to="/admin/users">Panel Admin</Link></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={openLogoutModal}>Cerrar Sesión</button></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login"><i className="bi bi-person-circle fs-4 text-dark"></i></Link>
              )}
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav p-3 border-top">
            <li className="nav-item py-2"><Link className="nav-link" to="/top" onClick={() => actions.setCategory("top")}>Ofertas del día</Link></li>
            <li className="nav-item py-2"><Link className="nav-link" to="/gastronomia" onClick={() => actions.setCategory("food")}>Restaurantes</Link></li>
            <li className="nav-item py-2"><Link className="nav-link" to="/belleza" onClick={() => actions.setCategory("beauty")}>Belleza y spa</Link></li>
            <li className="nav-item py-2"><Link className="nav-link" to="/viajes" onClick={() => actions.setCategory("travel")}>Viajes</Link></li>
          </ul>
        </div>
      </header>

      {/* Modal de cierre de sesión */}
      <Modal show={showLogoutModal} onHide={closeLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{loggingOut ? "Cerrando Sesión..." : "¿Deseas cerrar sesión?"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loggingOut
            ? "¡Gracias por tu visita! Cerrando sesión..."
            : "Tu sesión actual se cerrará y volverás al inicio."}
        </Modal.Body>
        {!loggingOut && (
          <Modal.Footer>
            <Button variant="secondary" onClick={closeLogoutModal}>Cancelar</Button>
            <Button variant="danger" onClick={handleLogout}>Cerrar Sesión</Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default LayoutHeader;
