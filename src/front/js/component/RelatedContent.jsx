import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const RelatedContent = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Estado para guardar el índice actual de cada categoría
  const [currentIndices, setCurrentIndices] = useState({
    Belleza: 0,
    gastronomia: 0,
    viajes: 0,
  });

  // Categorías disponibles
  const categories = [
    { id: "Belleza", name: "Belleza", deals: store.serviciosBelleza || [] },
    { id: "gastronomia", name: "Gastronomía", deals: store.serviciosGastronomia || [] },
    { id: "viajes", name: "Viajes", deals: store.serviciosViajes || [] },
  ];

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      if (store.serviciosViajes.length === 0) await actions.cargarServiciosViajes();
      if (store.serviciosGastronomia.length === 0) await actions.cargarServiciosGastronomia();
      if (store.serviciosBelleza.length === 0) await actions.cargarServiciosBelleza();
    };

    fetchData();
  }, []);

  // Manejar navegación al detalle del producto
  const handleNavigate = (deal) => {
    navigate(`/product-detail`, {
      state: { offer: deal }
    });
  };

  // Función para manejar el scroll/paginación
  const scroll = (categoryId, direction, e) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentIndices((prev) => {
      const current = prev[categoryId] || 0;
      const category = categories.find(cat => cat.id === categoryId);
      const totalDeals = category?.deals.length || 0;
      const visibleCount = 4; // Máximo de cards a mostrar
      
      // Calcular nuevo índice basado en la dirección
      let newIndex;
      if (direction === "left") {
        // Retroceder: ir al grupo anterior de 4 o al inicio
        newIndex = Math.max(current - visibleCount, 0);
      } else {
        // Avanzar: ir al siguiente grupo de 4 o quedarse si no hay más
        newIndex = Math.min(current + visibleCount, totalDeals - 1);
        
        // Si al avanzar no hay suficientes elementos, mostrar los que quedan
        if (newIndex + visibleCount > totalDeals) {
          newIndex = totalDeals - (totalDeals % visibleCount || visibleCount);
        }
      }

      return { ...prev, [categoryId]: newIndex };
    });
  };

  // Verificar si hay datos para mostrar
  const hasAnyData = categories.some(cat => cat.deals.length > 0);

  return (
    <section className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <div>
        <h2 className="fs-3 fw-bold mb-4">También te puede interesar</h2>

        {hasAnyData ? (
          categories.map((category) => {
            const currentIndex = currentIndices[category.id] || 0;
            const totalDeals = category.deals.length;
            const remainingDeals = totalDeals - currentIndex;
            const dealsToShow = category.deals.slice(
              currentIndex, 
              Math.min(currentIndex + 4, totalDeals) // Mostrar hasta 4 o los que queden
            );

            return (
              <div key={category.id} className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="fs-4 fw-bold mb-0">{category.name}</h3>
                  <button
                    onClick={() => navigate(`/category/${category.id.toLowerCase()}`)}
                    className="btn btn-link text-danger text-decoration-none p-0"
                  >
                    Explorar {category.name.toLowerCase()} →
                  </button>
                </div>

                <div className="position-relative">
                  {/* Botón izquierdo */}
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y z-1"
                    onClick={(e) => scroll(category.id, "left", e)}
                    disabled={currentIndex === 0}
                  >
                    &#8592;
                  </button>

                  {/* Cards */}
                  <div className="row gx-3">
                    {dealsToShow.map((deal) => {
                      const offer = {
                        id: deal.id,
                        title: deal.nombre || deal.title || "Sin título",
                        image: deal.imagen || deal.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
                        rating: deal.rating || 4,
                        reviews: deal.reviews || 20,
                        discountPrice: deal.precio || deal.discountPrice || 0,
                        originalPrice: deal.originalPrice || Math.round((deal.precio || deal.discountPrice || 0) * 1.2),
                        buyers: deal.buyers || 5,
                      };

                      return (
                        <div key={`${category.id}-${deal.id}`} className="col-12 col-sm-6 col-md-3">
                          <CategoryCard
                            offer={offer}
                            onViewService={() => handleNavigate(offer)}
                          />
                        </div>
                      );
                    })}

                    {/* Espacios vacíos si hay menos de 4 cards */}
                    {dealsToShow.length < 4 && 
                      Array.from({ length: 4 - dealsToShow.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="col-12 col-sm-6 col-md-3" style={{ visibility: 'hidden' }} />
                      ))
                    }
                  </div>

                  {/* Botón derecho */}
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y z-1"
                    onClick={(e) => scroll(category.id, "right", e)}
                    disabled={currentIndex + 4 >= totalDeals}
                  >
                    &#8594;
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Cargando información...</p>
        )}
      </div>
    </section>
  );
};

export default RelatedContent;