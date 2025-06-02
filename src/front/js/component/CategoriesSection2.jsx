import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function NavBar({ items, onNavigate }) {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  // Permite configurar desde props o fallback a store.navItems
  const navItems = items || store.navItems || [
    { id: "home",    name: "Top Ofertas",   icon: "⭐", url: "/category/belleza" },
    { id: "guia",    name: "Guía 2025",icon:"📖", url: "/guia2025" },
    { id: "blog",    name: "Tendencias 2025",     icon:"📈", url: "/tendencias2025" },
    { id: "contacto",name: "Contacto", icon:"📞", url: "/contacto" }
  ];

  const handleNavigate = url => {
    if (typeof onNavigate === "function") onNavigate(url);
    else navigate(url);
  };

  return (
    <nav className="bg-white border-bottom py-2">
      <div className="container d-flex justify-content-center">
        {navItems.map(({ id, name, icon, url }) => (
          <button
            key={id}
            onClick={() => handleNavigate(url)}
            className="btn btn-link text-dark mx-2 d-flex align-items-center"
            style={{ textDecoration: "none", fontWeight: 500 }}
          >
            <span className="me-1 fs-4">{icon}</span>
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
}
