import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function NavBar({ items, onNavigate }) {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  // Permite configurar desde props o fallback a store.navItems
  const navItems = items || store.navItems || [
    { id: "home",     name: "Top Ofertas",      icon: "⭐", url: "/category/belleza" },
    { id: "guia",     name: "Guía 2025",        icon: "📖", url: "/guia2025" },
    { id: "blog",     name: "Tendencias 2025",   icon: "📈", url: "/tendencias2025" },
    { id: "contacto", name: "Contacto",         icon: "📞", url: "/contacto" }
  ];

  const handleNavigate = url => {
    if (typeof onNavigate === "function") onNavigate(url);
    else navigate(url);
  };

  return (
    <section className="py-5 bg-white">
      <div className="container col-12 col-sm-10 col-md-10 col-lg-10 mx-auto px-3 px-sm-4">
        <h2 className="h4 fw-bold mb-4">Explora por categorías</h2>
        <div className="row g-3">
          {navItems.map(({ id, name, icon, url }) => (
            <div className="col-6 col-md-6 col-lg-3" key={id}>
              <button
                onClick={() => handleNavigate(url)}
                className="btn border border-light w-100 py-3 d-flex flex-column align-items-center justify-content-center rounded shadow-sm category-btn"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ececec"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = ""}
              >
                <span className="fs-2 mb-2">{icon}</span>
                <span className="fw-semibold">{name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .category-btn {
          /* Definimos una altura fija para que todos los botones conserven el mismo tamaño */
          height: 8rem;
          /* Aseguramos que el contenido esté centrado vertical y horizontalmente */
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: background-color 0.2s ease-in-out;
        }

        /* Ajustes responsivos de ícono y texto, sin alterar la altura fija */
        @media (max-width: 576px) {
          .category-btn span.fs-2 {
            font-size: 1.5rem !important;
          }
          .category-btn span.fw-semibold {
            font-size: 0.9rem;
          }
        }
        @media (min-width: 577px) and (max-width: 768px) {
          .category-btn span.fs-2 {
            font-size: 2rem !important;
          }
          .category-btn span.fw-semibold {
            font-size: 1rem;
          }
        }
        @media (min-width: 769px) {
          .category-btn span.fs-2 {
            font-size: 2.5rem !important;
          }
          .category-btn span.fw-semibold {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}


