import React from "react";
import { useNavigate } from "react-router-dom";

const CategoriesSection = ({ categories, onNavigate }) => {
  const navigate = useNavigate();

  // Usa las categorías pasadas por props o un fallback
  const items = categories || [
    { id: "belleza",       name: "Top Ofertas",       icon: "⭐", url: "/category/belleza" },
    { id: "gastronomia",   name: "Guía 2025",   icon: "📖", url: "/guia2025" },
    { id: "viajes",        name: "Tendencias 2025",        icon: "📈", url: "/tendencias2025" },
    { id: "ofertas",       name: "Contacto",   icon: "📞", url: "/contacto" }
  ];

  const handleNavigate = url => {
    if (typeof onNavigate === "function") {
      onNavigate(url);
    } else {
      navigate(url);
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="container col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="h4 fw-bold mb-4">Explora por categorías</h2>
        <div className="row g-3">
          {items.map(({ id, name, icon, url }) => (
            <div className="col-6 col-md-3" key={id}>
              <button
                onClick={() => handleNavigate(url)}
                className="btn border border-light w-100 py-3 d-flex flex-column align-items-center justify-content-center rounded shadow-sm"
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
    </section>
  );
};

export default CategoriesSection;

