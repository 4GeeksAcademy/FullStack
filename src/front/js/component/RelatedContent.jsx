import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const RelatedContent = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const containerRefs = useRef({});

  const getCardsPerPage = () => {
    const w = window.innerWidth;
    if (w >= 1150) return 4;
    if (w >= 870) return 3;
    return 2;
  };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());
  const [currentIndices, setCurrentIndices] = useState({
    Belleza: 0,
    gastronomia: 0,
    viajes: 0,
  });

  useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      if (!store.serviciosViajes.length) await actions.cargarServiciosViajes();
      if (!store.serviciosGastronomia.length) await actions.cargarServiciosGastronomia();
      if (!store.serviciosBelleza.length) await actions.cargarServiciosBelleza();
    })();
  }, [store, actions]);

  const categories = [
    { id: "Belleza", name: "Belleza", deals: store.serviciosBelleza || [] },
  ];

  const handleNavigate = (deal, categoryId) => {
    const offer = {
      ...deal,
      title: deal.title || deal.nombre,
      image: deal.image || deal.imagen,
      price: deal.price || deal.precio,
      discountPrice: deal.discountPrice || deal.discountPrecio,
      rating: deal.rating,
      reviews: deal.reviews,
      buyers: deal.buyers || 0,
      category: categoryId,
    };
    navigate(`/product-detail`, { state: { offer, category: categoryId } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scroll = (categoryId, direction, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndices((prev) => {
      const len = categories.find((c) => c.id === categoryId).deals.length;
      const idx = prev[categoryId];
      const delta = direction === "left" ? -cardsPerPage : cardsPerPage;
      const next = Math.min(
        Math.max(idx + delta, 0),
        Math.max(len - cardsPerPage, 0)
      );
      return { ...prev, [categoryId]: next };
    });
  };

  const hasAnyData = categories.some((c) => c.deals.length > 0);

  const [touchData, setTouchData] = useState({});

  const onTouchStart = (categoryId) => (e) => {
    setTouchData((td) => ({
      ...td,
      [categoryId]: { startX: e.touches[0].clientX, currentX: null },
    }));
  };

  const onTouchMove = (categoryId) => (e) => {
    setTouchData((td) => ({
      ...td,
      [categoryId]: { ...td[categoryId], currentX: e.touches[0].clientX },
    }));
  };

  const onTouchEnd = (categoryId) => () => {
    const { startX, currentX } = touchData[categoryId] || {};
    if (startX != null && currentX != null) {
      const diff = startX - currentX;
      if (Math.abs(diff) > 50) {
        scroll(categoryId, diff > 0 ? "right" : "left");
      }
    }
    setTouchData((td) => ({ ...td, [categoryId]: {} }));
  };

  return (
    <section className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <h4 className="fs-3 fw-bold mb-4">Descubre nuestros paquetes de bodas</h4>

      {hasAnyData ? (
        categories.map((category) => {
          const currentIndex = currentIndices[category.id] || 0;
          const visibleDeals = category.deals.slice(
            currentIndex,
            currentIndex + cardsPerPage
          );
          return (
            <div key={category.id} className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fs-4 fw-bold mb-0"></h3>
                <button
                  onClick={() =>
                    navigate(`/category/${category.id.toLowerCase()}`)
                  }
                  className="btn btn-link text-danger text-decoration-none p-0"
                >
                  Ver más →
                </button>
              </div>

              <div
                className="position-relative"
                onTouchStart={onTouchStart(category.id)}
                onTouchMove={onTouchMove(category.id)}
                onTouchEnd={onTouchEnd(category.id)}
                ref={(el) => (containerRefs.current[category.id] = el)}
              >
                {/* Flecha izquierda */}
                <button
                  className="arrow-btn position-absolute top-50 start-0 translate-middle-y"
                  style={{
                    backgroundColor: "#D64550",
                    color: "#FFFFFF",
                    border: "2px solid #000000",
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                  onClick={(e) => scroll(category.id, "left", e)}
                  disabled={currentIndex === 0}
                >
                  &#8592;
                </button>

                <div
                  className="row gx-3"
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflow: "auto",
                  }}
                >
                  {visibleDeals.map((deal) => (
                    <div
                      key={`${category.id}-${deal.id}`}
                      className="col-12 col-md-6 col-lg-3"
                      style={{
                        flex: `0 0 ${100 / cardsPerPage}%`,
                        maxWidth: `${100 / cardsPerPage}%`,
                      }}
                    >
                      <CategoryCard
                        offer={{
                          ...deal,
                          title: deal.title || deal.nombre,
                          image: deal.image || deal.imagen,
                          price: deal.price || deal.precio,
                          discountPrice:
                            deal.discountPrice || deal.discountPrecio,
                          rating: deal.rating,
                          reviews: deal.reviews,
                          buyers: deal.buyers || 0,
                        }}
                        onViewService={() =>
                          handleNavigate(deal, category.id)
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Flecha derecha */}
                <button
                  className="arrow-btn position-absolute top-50 end-0 translate-middle-y"
                  style={{
                    backgroundColor: "#D64550",
                    color: "#FFFFFF",
                    border: "2px solid #000000",
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                  onClick={(e) => scroll(category.id, "right", e)}
                  disabled={
                    currentIndex + cardsPerPage >= category.deals.length
                  }
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
    </section>
  );
};

export default RelatedContent;
