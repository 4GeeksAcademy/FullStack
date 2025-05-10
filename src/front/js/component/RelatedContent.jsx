import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const RelatedContent = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [currentIndices, setCurrentIndices] = useState({
    Belleza: 0,
    gastronomia: 0,
    viajes: 0,
  });

  const categories = [
    { id: "belleza", name: "Belleza", deals: store.serviciosBelleza || [] },
    { id: "gastronomia", name: "Gastronomía", deals: store.serviciosGastronomia || [] },
    { id: "viajes", name: "Viajes", deals: store.serviciosViajes || [] },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (store.serviciosViajes.length === 0) await actions.cargarServiciosViajes();
      if (store.serviciosGastronomia.length === 0) await actions.cargarServiciosGastronomia();
      if (store.serviciosBelleza.length === 0) await actions.cargarServiciosBelleza();
    };

    fetchData();
  }, []);

  const handleNavigate = (deal, categoryId) => {
    const offer = {
      id: deal.id,
      title: deal.title || deal.nombre || "Sin título",
      image: deal.image || deal.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen",
      rating: deal.rating || 4,
      reviews: deal.reviews || 20,
      price: deal.price || deal.precio || 0,
      discountPrice: deal.discountPrice || null,
      originalPrice: deal.originalPrice || null,
      buyers: deal.buyers || 0,
      descripcion: deal.descripcion || "",
      city: deal.city || "",
      category: categoryId,
      ...deal
    };

    navigate(`/product-detail`, {
      state: { 
        offer: offer,
        category: categoryId
      }
    });
  };

  const scroll = (categoryId, direction, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndices(prev => ({
      ...prev,
      [categoryId]: direction === "left" 
        ? Math.max(prev[categoryId] - 4, 0)
        : Math.min(prev[categoryId] + 4, categories.find(c => c.id === categoryId).deals.length - 4)
    }));
  };

  const hasAnyData = categories.some(cat => cat.deals.length > 0);

  return (
    <section className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <div>
        <h2 className="fs-3 fw-bold mb-4">También te puede interesar</h2>

        {hasAnyData ? (
          categories.map((category) => {
            const currentIndex = currentIndices[category.id] || 0;
            const dealsToShow = category.deals.slice(currentIndex, currentIndex + 4);

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
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y z-1"
                    onClick={(e) => scroll(category.id, "left", e)}
                    disabled={currentIndex === 0}
                  >
                    &#8592;
                  </button>

                  <div className="row gx-3">
                    {dealsToShow.map((deal, index) => (
                      <div key={`${category.id}-${deal.id}-${index}`} className="col-12 col-sm-6 col-md-3">
                        <CategoryCard
                          offer={{
                            ...deal,
                            title: deal.title || deal.nombre,
                            image: deal.image || deal.imagen,
                            price: deal.price || deal.precio,
                            category: category.id
                          }}
                          onViewService={() => handleNavigate(deal, category.id)}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y z-1"
                    onClick={(e) => scroll(category.id, "right", e)}
                    disabled={currentIndex + 4 >= category.deals.length}
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