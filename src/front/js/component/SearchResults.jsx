import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

// Mapea IDs numéricos y strings a los slugs de ruta
const slugMap = {
  1:           "viajes",
  2:           "belleza",
  3:           "top",
  4:           "gastronomia",
  5:           "ofertas",

  viajes:      "viajes",
  belleza:     "belleza",
  top:         "top",
  gastronomia: "gastronomia",
  ofertas:     "ofertas",
  beauty:      "belleza",  // por si tu API usa "beauty"
};

const normalize = str =>
  str?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

const SearchResults = () => {
  const { keyword } = useParams();
  const { store, actions } = useContext(Context);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return setLoading(false);
    }

    // Carga todas las colecciones si no están
    if (!store.serviciosViajes.length)      actions.cargarServiciosViajes();
    if (!store.serviciosGastronomia.length) actions.cargarServiciosGastronomia();
    if (!store.serviciosBelleza.length)     actions.cargarServiciosBelleza();
    if (!store.serviciosTop.length)         actions.cargarServiciosTop();
    if (!store.serviciosOfertas.length)     actions.cargarServiciosOfertas();

    setLoading(true);
    const term = normalize(keyword);

    const all = [
      ...store.serviciosViajes,
      ...store.serviciosGastronomia,
      ...store.serviciosBelleza,
      ...store.serviciosTop,
      ...store.serviciosOfertas,
    ];

    const filtered = all.filter(item =>
      normalize(item.title).includes(term) ||
      normalize(item.descripcion).includes(term) ||
      normalize(item.category).includes(term) ||
      normalize(item.category_id).includes(term) ||
      (Array.isArray(item.tags) &&
       item.tags.some(tag => normalize(tag).includes(term)))
    );

    setResults(filtered);
    setLoading(false);
  }, [keyword, store, actions]);


  // Función para navegar al detalle del producto
  const navigateToProductDetail = (product) => {
    navigate("/product-detail", {
      state: {
        offer: {
          ...product,
          title: product.title || "Sin título",
          image: product.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
          rating: product.rating || 4,
          reviews: product.reviews || 20,
          price: product.price || 0,
          discountPrice: product.discountPrice || null,
          originalPrice: product.originalPrice || null,
          buyers: product.buyers || 0,
          descripcion: product.descripcion || "",
          city: product.city || ""
        },
        category: determineCategory(product.id)
      }
    });
  };

  // Función para determinar la categoría de un producto
  const determineCategory = (productId) => {
    if (store.serviciosViajes.some(item => item.id === productId)) return "viajes";
    if (store.serviciosGastronomia.some(item => item.id === productId)) return "gastronomia";
    if (store.serviciosBelleza.some(item => item.id === productId)) return "belleza";
    if (store.serviciosOfertas.some(item => item.id === productId)) return "ofertas";
    if (store.serviciosTop.some(item => item.id === productId)) return "top";
    return "general";
  };


  return (
    <div className="container mt-4">
      <h2 className="text-start mb-5">
        Resultados para <span className="text-primary">"{keyword}"</span>
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Buscando...</span>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="row">

          {results.map((item, index) => (
            <div className="col-md-4 mb-4" key={`${item.id}-${index}`}>
              <div className="card h-100 shadow-sm">
                {item.image && (
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-muted">
                    {item.descripcion?.substring(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="badge bg-primary">{item.category}</span>
                    <span className="text-success fw-bold">
                      {item.price ? `$${item.price}` : "Consultar precio"}
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <button
                    onClick={() => navigateToProductDetail(item)}
                    className="btn btn-danger w-100"
                  >
                    Ver oferta
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-warning">
          No se encontraron resultados para “{keyword}”.
        </div>
      )}
    </div>
  );
};


export default SearchResults;

