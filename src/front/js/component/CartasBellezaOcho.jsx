import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const CartasBellezaOcho = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadBelleza = async () => {
      try {
        await actions.cargarServiciosBelleza();
        if (isMounted) setLoading(false);
      } catch (err) {
        console.error("Error al cargar los servicios de belleza:", err);
        if (isMounted) {
          setError("Hubo un error al cargar los servicios.");
          setLoading(false);
        }
      }
    };

    loadBelleza();

    return () => {
      isMounted = false;
    };
  }, [actions, forceUpdate]);

  const handleViewProductDetail = (offer) => {
    navigate("/product-detail", { state: { offer } });
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const refreshBelleza = () => {
    setLoading(true);
    setForceUpdate(prev => prev + 1);
  };

  if (loading) {
    return (
      <section className="py-5">
        <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando servicios de belleza...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <div className="alert alert-danger">
            {error}
            <button 
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={refreshBelleza}
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar primero los más recientes (ya vienen ordenados del backend)
  const bellezaAMostrar = showAll ? store.serviciosBelleza : store.serviciosBelleza.slice(0, 8);

  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold fs-4 mb-0">Ofertas de Belleza</h2>
          <div>
            <button 
              className="btn btn-outline-primary me-2" 
              onClick={refreshBelleza}
            >
              <i className="bi bi-arrow-clockwise"></i> Actualizar
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={toggleShowAll}
            >
              {showAll ? 'Mostrar menos' : 'Ver todos'}
            </button>
          </div>
        </div>

        <div className="row g-4">
          {bellezaAMostrar.map((deal) => {
            const offer = {
              id: deal.id,
              title: deal.title || deal.nombre || "Sin título",
              image: deal.image || deal.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen",
              rating: deal.rating || 4,
              reviews: deal.reviews || 0,
              discountPrice: deal.discountPrice || deal.precio || deal.price || 0,
              originalPrice: deal.originalPrice || 
                (deal.discountPrice ? Math.round(deal.discountPrice * 1.2) : 
                deal.precio ? Math.round(deal.precio * 1.2) : 
                deal.price ? Math.round(deal.price * 1.2) : 0),
              buyers: deal.buyers || 0,
              descripcion: deal.descripcion || "",
              city: deal.city || "Ubicación no especificada"
            };

            return (
              <div className="col-12 col-md-6 col-lg-3" key={deal.id}>
                <CategoryCard
                  offer={offer}
                  onViewService={() => handleViewProductDetail(offer)}
                />
              </div>
            );
          })}
        </div>

        {store.serviciosBelleza.length === 0 && (
          <div className="alert alert-info mt-4">
            No hay servicios de belleza disponibles actualmente.
          </div>
        )}
      </div>
    </section>
  );
};

export default CartasBellezaOcho;