import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const CategoriesSection = ({ onNavigate }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  // Asegurar que tenemos todas las categorías necesarias
  const categories = store.categories || [
    { id: "belleza", name: "Belleza", icon: "💆‍♀️" },
    { id: "gastronomia", name: "Gastronomía", icon: "🍽️" },
    { id: "viajes", name: "Viajes", icon: "✈️" },
    { id: "ofertas", name: "Top Ofertas", icon: "🔥" }
  ];

  const handleNavigate = (categoryId, categoryName) => {
    navigate(`/category/${categoryId}`, { 
      state: { categoryName } 
    });
  };

  return (
    <section className="py-5 bg-white">
      <div className="container col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="h4 fw-bold mb-4">Explora por categorías</h2>
        <div className="row g-3">
          {categories.map((category) => (
            <div className="col-6 col-md-3" key={category.id}>
              <button
                onClick={() => handleNavigate(category.id, category.name)}
                className="btn border border-light w-100 py-3 d-flex flex-column align-items-center justify-content-center rounded shadow-sm"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ececec")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
              >
                <span className="fs-2 mb-2">{category.icon}</span>
                <span className="fw-semibold">{category.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;