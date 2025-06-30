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
      const categoryNames = {
        'belleza': 'Paquetes de Bodas',
        'gastronomia': 'Gastronomía',
        'viajes': 'Viajes',
        'ofertas': 'Ofertas Especiales',
        'top': 'Top Ofertas Premium'
      };
      setCategoryName(categoryNames[categoryId] || "Productos");
    }

    const loadCategoryProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let categoryProducts = [];
        
        switch (categoryId) {
          case "belleza":
            await actions.cargarServiciosBelleza();
            categoryProducts = [...store.serviciosBelleza];
            break;
          
          case "gastronomia":
            await actions.cargarServiciosGastronomia();
            categoryProducts = [...store.serviciosGastronomia];
            break;
          
          case "viajes":
            await actions.cargarServiciosViajes();
            categoryProducts = [...store.serviciosViajes];
            break;
          
          case "ofertas":
            await actions.cargarServiciosOfertas();
            categoryProducts = [...store.serviciosOfertas];
            break;
          
          case "top":
            await actions.cargarServiciosTop();
            // Usamos serviciosTop del store y filtramos productos válidos
            categoryProducts = [...store.serviciosTop]
              .filter(product => product && product.title && (product.image || product.descripcion))
              .sort((a, b) => {
                // Ordenar por rating (desc), luego por reviews (desc)
                if (b.rating !== a.rating) return (b.rating || 0) - (a.rating || 0);
                return (b.reviews || 0) - (a.reviews || 0);
              });
            break;
          
          default:
            setError("Categoría no encontrada");
            break;
        }
        
        setProducts(categoryProducts);
        setCurrentPage(0);
      } catch (err) {
        console.error(`Error al cargar productos de ${categoryId}:`, err);
        setError(`Hubo un error al cargar los productos de ${categoryName}`);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [categoryId, location.state]);

  // ... (resto del código permanece igual)
  const handleViewProductDetail = (product) => {
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
        category: categoryId
      }
    });
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

  // Calcular productos visibles
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
              {products.length > itemsPerPage && (
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
              )}
            </div>
          </div>
          
          <div className="row g-4">
            {visibleProducts.map((product) => (
              <div className="col-12 col-md-6 col-lg-3" key={product.id}>
                <CategoryCard
                  offer={{
                    ...product,
                    title: product.title || "Sin título",
                    image: product.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
                    price: product.price || 0,
                    discountPrice: product.discountPrice || null
                  }}
                  onViewService={() => handleViewProductDetail(product)}
                />
              </div>
            ))}
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