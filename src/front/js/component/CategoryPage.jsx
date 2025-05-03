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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    if (location.state && location.state.categoryName) {
      setCategoryName(location.state.categoryName);
    } else {
      const foundCategory = store.categories.find(cat => cat.id === categoryId);
      if (foundCategory) {
        setCategoryName(foundCategory.name);
      } else {
        setCategoryName("Productos");
      }
    }

    const loadCategoryProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let categoryProducts = [];
        
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
          case "top":
            if (store.serviciosOfertas.length === 0) {
              await actions.cargarServiciosOfertas();
            }
            categoryProducts = store.serviciosOfertas;
            setCategoryName("Top Ofertas");
            break;
          
          default:
            setError("Categoría no encontrada");
            break;
        }
        
        setProducts(categoryProducts);
        setCurrentPage(0); // Resetear a la primera página al cambiar de categoría
      } catch (err) {
        console.error(`Error al cargar productos de la categoría ${categoryId}:`, err);
        setError(`Hubo un error al cargar los productos de ${categoryName}`);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [categoryId, actions, store]);

  const handleViewProductDetail = (offer) => {
    navigate("/product-detail", { state: { offer } });
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      if (direction === "prev") {
        return Math.max(prev - 1, 0);
      } else {
        return Math.min(prev + 1, Math.ceil(products.length / itemsPerPage) - 1);
      }
    });
  };

  // Calcular los productos a mostrar
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

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
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-secondary me-2" 
                onClick={() => navigate('/')}
              >
                <i className="bi bi-house-door me-2"></i>Volver al inicio
              </button>
              <div className="btn-group">
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 0}
                >
                  &#8592;
                </button>
                <span className="px-3 d-flex align-items-center">
                  Página {currentPage + 1} de {totalPages}
                </span>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage >= totalPages - 1}
                >
                  &#8594;
                </button>
              </div>
            </div>
          </div>
          
          <div className="row g-4">
            {visibleProducts.map((product, index) => {
              const offer = {
                id: product.id,
                title: product.title || product.nombre || "Sin título",
                image: product.image || product.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen",
                rating: product.rating || 4,
                reviews: product.reviews || 20,
                discountPrice: product.discountPrice || product.precio || 0,
                originalPrice: product.originalPrice || 
                  (product.precio ? Math.round(product.precio * 1.2) : 
                  product.discountPrice ? Math.round(product.discountPrice * 1.2) : 0),
                buyers: product.buyers || 5,
                descripcion: product.descripcion || product.description || "",
                city: product.city || ""
              };
              
              return (
                <div className="col-12 col-md-6 col-lg-3" key={`${product.id}-${index}`}>
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