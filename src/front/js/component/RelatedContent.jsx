import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const RelatedContent = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Usar useNavigate para redirigir al usuario

  const [currentIndex, setCurrentIndex] = useState(0); // Para controlar el índice de las tarjetas mostradas

  useEffect(() => {
    const fetchData = async () => {
      if (store.serviciosViajes.length === 0) {
        await actions.cargarServiciosViajes();
      }
      if (store.serviciosGastronomia.length === 0) {
        await actions.cargarServiciosGastronomia();
      }
      if (store.serviciosBelleza.length === 0) {
        await actions.cargarServiciosBelleza();
      }
    };

    fetchData();
  }, []);

  const defaultOffer = store.producto && store.producto.length > 0 ? store.producto[0] : null;

  // Construimos las categorías con los datos disponibles
  const categories = [
    {
      id: "Belleza",
      name: "Belleza",
      deals: store.serviciosBelleza || [],
    },
    {
      id: "gastronomia",
      name: "Gastronomía",
      deals: store.serviciosGastronomia || [],
    },
    {
      id: "viajes",
      name: "Viajes",
      deals: store.serviciosViajes || [],
    },
  ];

  // Función para manejar el desplazamiento de las tarjetas
  const scroll = (direction) => {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    } else if (direction === "right" && currentIndex + 4 < categories[0].deals.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  // Verificamos si alguna categoría tiene datos para mostrar
  const hasAnyData = categories.some(category => category.deals && category.deals.length > 0);

  // Función que maneja la navegación al hacer clic en "Explorar"
  const handleNavigate = (categoryId) => {
    navigate(`${categoryId.toLowerCase()}`); // Usar el ID de la categoría para la ruta
  };

  return (
    <section className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
      <div>
        <h2 className="fs-3 fw-bold mb-4">También te puede interesar</h2>

        {hasAnyData ? (
          categories.map((category) => (
            <div key={category.id} className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fs-4 fw-bold mb-0">{category.name}</h3>
                <button
                  onClick={() => handleNavigate(category.id)} // Llamar a la función handleNavigate
                  className="btn btn-link text-danger text-decoration-none p-0"
                >
                  Explorar {category.name.toLowerCase()} →
                </button>
              </div>

              <div className="position-relative">
                {/* Flecha izquierda */}
                <button
                  className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y z-1"
                  onClick={() => scroll("left")}
                  style={{ zIndex: 2 }}
                  disabled={currentIndex === 0} // Desactivar si estamos en la primera posición
                >
                  &#8592; {/* Flecha hacia la izquierda */}
                </button>

                {/* Contenedor de tarjetas */}
                <div className="row gx-3"> {/* Cambié el contenedor de tarjetas a row */}
                  {category.deals.slice(currentIndex, currentIndex + 4).map((deal, index) => {
                    const offer = {
                      title: deal.nombre || deal.title || "Sin título",
                      image:
                        deal.imagen ||
                        deal.image ||
                        "https://via.placeholder.com/300x200?text=Sin+imagen",
                      rating: deal.rating || 4,
                      reviews: deal.reviews || 20,
                      discountPrice:
                        deal.precio || deal.discountPrice || 0,
                      originalPrice:
                        deal.originalPrice ||
                        (deal.precio
                          ? Math.round(deal.precio * 1.2)
                          : deal.discountPrice
                            ? Math.round(deal.discountPrice * 1.2)
                            : 0),
                      buyers: deal.buyers || 5,
                    };

                    return (
                      <div
                        key={`${category.id}-${index}`}
                        className="col-12 col-sm-6 col-md-3" // 1 tarjeta por fila en móvil, 2 por fila en tablet, 4 por fila en escritorio
                      >
                        <CategoryCard
                          offer={offer}
                          onViewService={() => handleNavigate(category.id)} // Llamar a la función handleNavigate también aquí si lo necesitas
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Flecha derecha */}
                <button
                  className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y z-1"
                  onClick={() => scroll("right")}
                  style={{ zIndex: 2 }}
                  disabled={currentIndex + 4 >= category.deals.length} // Desactivar si estamos en la última página
                >
                  &#8594; {/* Flecha hacia la derecha */}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando información...</p> // Mensaje mientras se cargan los datos
        )}
      </div>
    </section>
  );
};

export default RelatedContent;
