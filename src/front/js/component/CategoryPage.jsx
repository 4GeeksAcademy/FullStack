import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import LayoutHeader from "./LayoutHeader.jsx";
import Footer from "./Footer.jsx";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // Establecer el nombre de la categoría desde location state o buscar en store
    if (location.state && location.state.categoryName) {
      setCategoryName(location.state.categoryName);
    } else {
      // Intenta encontrar el nombre de la categoría en el store
      const foundCategory = store.categories.find(cat => cat.id === categoryId);
      if (foundCategory) {
        setCategoryName(foundCategory.name);
      } else {
        setCategoryName("Productos"); // Valor por defecto
      }
    }

    const loadCategoryProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let categoryProducts = [];
        
        // Determinar qué datos cargar basado en el categoryId
        switch (categoryId) {
          case "belleza":
            if (store.serviciosBelleza.length === 0) {
              await actions.cargarServiciosBelleza();
            }
            categoryProducts = store.serviciosBelleza;
            setCategoryName("Belleza");
            break;
          
          case "gastronomia":
            if (store.serviciosGastronomia.length === 0) {
              await actions.cargarServiciosGastronomia();
            }
            categoryProducts = store.serviciosGastronomia;
            setCategoryName("Gastronomía");
            break;
          
          case "viajes":
            if (store.serviciosViajes.length === 0) {
              await actions.cargarServiciosViajes();
            }
            categoryProducts = store.serviciosViajes;
            setCategoryName("Viajes");
            break;
          
          case "ofertas":
            if (store.serviciosOfertas.length === 0) {
              await actions.cargarServiciosOfertas();
            }
            categoryProducts = store.serviciosOfertas;
            setCategoryName("Top Ofertas");
            break;
            break;
          
          default:
            setError("Categoría no encontrada");
            break;
        }
        
        setProducts(categoryProducts);
      } catch (err) {
        console.error(`Error al cargar productos de la categoría ${categoryId}:`, err);
        setError(`Hubo un error al cargar los productos de ${categoryName}`);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [categoryId, actions, store]);

  // Función para navegar al detalle del producto
  const handleViewProductDetail = (offer) => {
    navigate("/product-detail", { state: { offer } });
  };

  if (loading) {
    return (
      <>
        <LayoutHeader />
        <div className="container my-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando productos...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <LayoutHeader />
        <div className="container my-5">
          <div className="alert alert-danger">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <LayoutHeader />
      <section className="py-5">
        <div className="container col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold fs-4 mb-0">{categoryName}</h2>
            <button 
              className="btn btn-outline-primary" 
              onClick={() => navigate('/')}
            >
              <i className="bi bi-house-door me-2"></i>Volver al inicio
            </button>
          </div>
          
          {/* Contenedor con fila de tarjetas */}
          <div className="row g-4">
            {products.slice(0, 8).map((product, index) => {
              const offer = {
                id: product.id,
                title: product.nombre || product.title || "Sin título",
                image: product.imagen || product.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
                rating: product.rating || 4,
                reviews: product.reviews || 20,
                discountPrice: product.precio || product.discountPrice || 0,
                originalPrice: product.originalPrice || 
                  (product.precio ? Math.round(product.precio * 1.2) : 
                   product.discountPrice ? Math.round(product.discountPrice * 1.2) : 0),
                buyers: product.buyers || 5,
                descripcion: product.descripcion || product.description || "",
                city: product.city || ""
              };
              
              return (
                <div className="col-12 col-md-6 col-lg-3" key={index}>
                  <CategoryCard
                    offer={offer}
                    onViewService={() => handleViewProductDetail(offer)}
                  />
                </div>
              );
            })}
          </div>
          
          {products.length === 0 && (
            <div className="alert alert-info">
              No hay productos disponibles en esta categoría.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CategoryPage;