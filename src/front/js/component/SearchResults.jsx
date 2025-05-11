import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

// Función utilitaria para normalizar textos
const normalize = (str) =>
  str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

const SearchResults = () => {
  const { keyword } = useParams();
  const { store, actions } = useContext(Context);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Efecto para cargar los datos y realizar la búsqueda
  useEffect(() => {
    if (!keyword) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Cargar los datos de cada categoría si no están cargados
    if (!store.serviciosViajes.length) actions.cargarServiciosViajes();
    if (!store.serviciosGastronomia.length) actions.cargarServiciosGastronomia();
    if (!store.serviciosBelleza.length) actions.cargarServiciosBelleza();
    if (!store.serviciosTop.length) actions.cargarServiciosTop();
    if (!store.serviciosOfertas.length) actions.cargarServiciosOfertas();

    setLoading(true);

    // Normalizamos el término de búsqueda
    const searchTerm = normalize(keyword);

    // Filtramos por cada categoría de servicios
    const filtered = [
      ...store.serviciosViajes,
      ...store.serviciosGastronomia,
      ...store.serviciosBelleza,
      ...store.serviciosTop,
      ...store.serviciosOfertas,
    ].filter((item) => {
      return (
        normalize(item.title).includes(searchTerm) ||
        normalize(item.descripcion).includes(searchTerm) ||
        normalize(item.category).includes(searchTerm) ||
        (Array.isArray(item.tags) &&
          item.tags.some((tag) => normalize(tag).includes(searchTerm)))
      );
    });

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
      <h2
        className="text-start mb-5 fw-normal display-5 text-gradient"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: "0.02em",
          position: "relative",
          paddingBottom: "15px"
        }}
      >
        Resultados para:
        <span
          className="fw-medium ms-2 text-primary"
          style={{ textTransform: "capitalize" }}
        >
          "{keyword}"
        </span>
        <div
          className="mx-auto mt-3"
          style={{
            width: "150px",
            height: "3px",
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            borderRadius: "3px"
          }}
        />
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
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning">
          No se encontraron resultados para "{keyword}". Intenta con otro término.
        </div>
      )}
    </div>
  );
};

export default SearchResults;