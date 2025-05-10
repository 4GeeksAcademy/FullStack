import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Context } from "../store/appContext";
import LayoutHeader from "./LayoutHeader.jsx";
import Footer from "./Footer.jsx";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { offer: locationOffer, category: locationCategory } = location.state || {};
  const { store, actions } = useContext(Context);
  const [completeOffer, setCompleteOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(locationCategory);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastProgress, setToastProgress] = useState(100);

  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774=";

  const determineCategory = (offerId) => {
    if (typeof offerId === 'string' && offerId.startsWith('temp-')) {
      const categoryPrefix = offerId.split('-')[1];
      switch(categoryPrefix) {
        case 'gast': return 'gastronomia';
        case 'bell': return 'belleza';
        case 'viaj': return 'viajes';
        default: return '';
      }
    }
    if (store.serviciosGastronomia.some(o => o.id === offerId)) return 'gastronomia';
    if (store.serviciosBelleza.some(o => o.id === offerId)) return 'belleza';
    if (store.serviciosViajes.some(o => o.id === offerId)) return 'viajes';
    return '';
  };

  useEffect(() => {
    if (id) {
      const category = determineCategory(id);
      setCurrentCategory(category);
    }
  }, [id, store]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (currentCategory) {
          switch(currentCategory) {
            case 'belleza':
              if (store.serviciosBelleza.length === 0) await actions.cargarServiciosBelleza();
              break;
            case 'gastronomia':
              if (store.serviciosGastronomia.length === 0) await actions.cargarServiciosGastronomia();
              break;
            case 'viajes':
              if (store.serviciosViajes.length === 0) await actions.cargarServiciosViajes();
              break;
            case 'ofertas':
              if (store.serviciosOfertas.length === 0) await actions.cargarServiciosOfertas();
              break;
          }
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentCategory]);

  useEffect(() => {
    if (loading) return;
    const findProduct = () => {
      if (locationOffer) return locationOffer;
      if (id) {
        if (typeof id === 'string' && id.startsWith('temp-')) {
          const title = id.split('-').slice(2).join(' ');
          const allOffers = [...store.serviciosGastronomia, ...store.serviciosBelleza, ...store.serviciosViajes];
          return allOffers.find(o => o.title === title);
        }
        const numericId = parseInt(id);
        const allOffers = [...store.serviciosGastronomia, ...store.serviciosBelleza, ...store.serviciosViajes];
        return allOffers.find(o => o.id === numericId);
      }
      return null;
    };
    const foundProduct = findProduct();
    setCompleteOffer(foundProduct);
  }, [id, locationOffer, store, loading]);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setToastProgress(100);

    let progress = 100;
    const interval = setInterval(() => {
      progress -= 2;
      setToastProgress(progress);
      if (progress <= 0) {
        clearInterval(interval);
        setToastVisible(false);
      }
    }, 50);
  };

  const addToCart = () => {
    actions.addToCart({
      ...displayData,
      discountPrice: actualDiscountPrice,
      originalPrice: actualPrice
    });
    showToast("Producto agregado al carrito");
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        item: {
          ...displayData,
          discountPrice: actualDiscountPrice,
          originalPrice: actualPrice
        }
      }
    });
  };

  if (!completeOffer && !loading) {
    return (
      <Container className="my-5">
        <div className="alert alert-warning">No se encontraron detalles del producto</div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  const displayData = completeOffer;
  const displayTitle = displayData.title || displayData.nombre || "Sin título";
  const displayImage = displayData.image || displayData.imagen || defaultImage;
  const displayDescription = displayData.descripcion || displayData.description || "No hay descripción disponible.";

  let actualPrice = displayData.price || displayData.precio || displayData.originalPrice || 1000;
  let actualDiscountPrice = displayData.discountPrice || Math.round(actualPrice * 0.7);
  if (actualDiscountPrice >= actualPrice) {
    actualDiscountPrice = Math.round(actualPrice * 0.7);
  }
  const finalDiscount = Math.round(((actualPrice - actualDiscountPrice) / actualPrice) * 100);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"} me-1`}
      ></i>
    ));

  return (
    <>
      <LayoutHeader />
      <Container className="my-5">
        <Row>
          <Col md={6} className="d-flex justify-content-center mb-4">
            <Card style={{ width: "100%" }}>
              <Card.Img
                variant="top"
                src={displayImage}
                alt={displayTitle}
                className="img-fluid"
                style={{ height: "auto", maxHeight: "500px", objectFit: "cover", backgroundColor: "#f8f9fa" }}
                onError={(e) => { e.target.src = defaultImage; }}
              />
            </Card>
          </Col>
          <Col md={6}>
            <div className="p-3">
              <h2 className="mb-3">{displayTitle}</h2>
              <div className="d-flex align-items-center mb-3">
                {renderStars(displayData.rating || 0)}
                <span className="ms-2 text-muted">({displayData.reviews || 0} reseñas)</span>
              </div>
              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <h3 className="text-danger fw-bold mb-0">${actualDiscountPrice}</h3>
                  <span className="ms-3 text-muted text-decoration-line-through">${actualPrice}</span>
                  <span className="ms-3 badge bg-danger">{finalDiscount}% OFF</span>
                </div>
                <p className="text-success mt-2 mb-0">{displayData.buyers || 0} personas ya han comprado esta oferta</p>
              </div>
              <div className="mb-4">
                <h5 className="mb-2">Descripción:</h5>
                <p className="text-muted">{displayDescription}</p>
              </div>
              {displayData.city && (
                <div className="mb-4">
                  <h5 className="mb-2">Ubicación:</h5>
                  <p className="text-muted">{displayData.city}</p>
                </div>
              )}
              <Button variant="danger" onClick={addToCart} className="btn-lg w-100 mb-2">
                Agregar al carrito
              </Button>
              <Button variant="success" onClick={handleBuyNow} className="btn-lg w-100 mb-3">
                Comprar ahora
              </Button>
              <div className="alert alert-light border mt-4">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-2"></i>
                  Garantía de satisfacción: Si no estás conforme con el servicio, te devolvemos tu dinero.
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Toast de confirmación */}
      {toastVisible && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
          <div className="toast show bg-dark text-white">
            <div className="toast-body">
              {toastMessage}
              <div className="progress mt-2" style={{ height: '4px' }}>
                <div className="progress-bar bg-success" style={{ width: `${toastProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;