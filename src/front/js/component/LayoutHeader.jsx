import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const LayoutHeader = () => {
  const { store, actions } = useContext(Context);
  const [location, setLocation] = useState("Madrid");
  const navigate = useNavigate();
  
  const cartItems = store.cartItems || 2;

  return (
    <>
      <header className="sticky-top bg-white shadow-sm">
        <div className="container d-flex align-items-center py-3 flex-wrap">
          {/* Logo Groupon */}
          <div
            className="d-flex align-items-center me-auto me-md-4"
            role="button"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-house-fill fs-2 text-danger me-2"></i>
            <h1 className="fs-4 fw-bold mb-0">GrouponClone</h1>
          </div>

          {/* Iconos móviles */}
          <div className="d-flex d-md-none align-items-center gap-3 order-md-last">
            {/* Icono de carrito */}
            <Link to="/cart" className="position-relative" role="button">
              <i className="bi bi-cart fs-4 text-dark"></i>
              {cartItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Icono de login */}
            <Link to="/login" role="button">
              <i className="bi bi-person-circle fs-4 text-dark"></i>
            </Link>

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
            <div className="d-flex flex-grow-1 align-items-center me-md-4">
              <input
                type="text"
                className="form-control me-2 rounded-pill"
                placeholder="Busca restaurantes, spas, actividades..."
              />
              <div className="d-flex align-items-center bg-light px-3 py-2 rounded-pill">
                <i className="bi bi-geo-alt-fill me-2 text-secondary"></i>
                <span className="text-muted small">{location}</span>
              </div>
            </div>

            <div className="d-none d-md-flex align-items-center gap-3 ms-auto">
              <Link to="/cart" className="position-relative" role="button">
                <i className="bi bi-cart fs-4 text-dark"></i>
                {cartItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems}
                  </span>
                )}
              </Link>

              <Link to="/login" role="button">
                <i className="bi bi-person-circle fs-4 text-dark"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav p-3 border-top">
            <li className="nav-item py-2">
              <Link
                className="nav-link"
                to="/top"
                onClick={() => actions.setCategory("top")}
              >
                Ofertas del día
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link
                className="nav-link"
                to="/food"
                onClick={() => actions.setCategory("food")}
              >
                Restaurantes
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link
                className="nav-link"
                to="/beauty"
                onClick={() => actions.setCategory("beauty")}
              >
                Belleza y spa
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link
                className="nav-link"
                to="/activities"
                onClick={() => actions.setCategory("activities")}
              >
                Actividades
              </Link>
            </li>
            <li className="nav-item py-2">
              <Link
                className="nav-link"
                to="/travel"
                onClick={() => actions.setCategory("travel")}
              >
                Viajes
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default LayoutHeader;
