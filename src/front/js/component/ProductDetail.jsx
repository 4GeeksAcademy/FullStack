import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import { Button, Container, Row, Col, Card, Spinner, InputGroup, FormControl } from "react-bootstrap";
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
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(locationCategory);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastProgress, setToastProgress] = useState(100);


  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg";

  const determineCategory = (offerId) => {
    const numId = parseInt(offerId, 10);
    if (store.serviciosViajes.some(o => o.id === numId)) return 'viajes';
    if (store.serviciosBelleza.some(o => o.id === numId)) return 'belleza';
    if (store.serviciosGastronomia.some(o => o.id === numId)) return 'gastronomia';
    if (store.serviciosTop.some(o => o.id === numId)) return 'top';
    if (store.serviciosOfertas.some(o => o.id === numId)) return 'ofertas';
    return '';
  };

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      const cat = locationCategory || determineCategory(id);
      setCurrentCategory(cat);

      switch(cat) {
        case 'viajes':
          if (!store.serviciosViajes.length) await actions.cargarServiciosViajes();
          break;
        case 'belleza':
          if (!store.serviciosBelleza.length) await actions.cargarServiciosBelleza();
          break;
        case 'gastronomia':
          if (!store.serviciosGastronomia.length) await actions.cargarServiciosGastronomia();
          break;
        case 'top':
          if (!store.serviciosTop.length) await actions.cargarServiciosTop();
          break;
        case 'ofertas':
          if (!store.serviciosOfertas.length) await actions.cargarServiciosOfertas();
          break;
        default:
          break;
      }
      setLoading(false);
    };

    loadCategory();
  }, [id, locationCategory, store, actions]);

  useEffect(() => {
    if (loading) return;


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
      id: String(displayData.id), // Asegurar ID como string
      title: displayTitle, // Usar el título formateado
      discountPrice: actualDiscountPrice,
      originalPrice: actualPrice,
      // Incluir todos los campos necesarios
      image: displayImage,
      city: displayData.city || "",
      category: displayData.category || currentCategory
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

  if (!completeOffer) {
    return (
      <Container className="my-5">
        <div className="alert alert-warning">
          No se encontraron detalles del producto en “{currentCategory}”
        </div>
      </Container>
    );
  }

  const display = completeOffer;
  const title = display.title || display.nombre || "Sin título";
  const image = display.image || display.imagen || defaultImage;
  const desc  = display.descripcion || display.description || "No hay descripción disponible.";

  const original = display.originalPrice ?? display.price ?? 0;
  let discountPrice = display.discountPrice ?? Math.round(original * 0.7);
  if (discountPrice >= original) discountPrice = Math.round(original * 0.7);
  const pctOff = original > 0 ? Math.round((original - discountPrice) / original * 100) : 0;


  const renderStars = (rating) =>

    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < (display.rating||0) ? "bi-star-fill text-warning" : "bi-star text-secondary"} me-1`}
      />
    ));

  return (
    <>
      <LayoutHeader />
      <Container className="my-5">
        {/* Botón Volver al inicio - AÑADIDO */}
        <div className="d-flex justify-content-start mb-4">
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => navigate('/')}
          >
            <i className="bi bi-house-door me-2"></i>Volver al inicio
          </button>
        </div>
        
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={image}
                style={{ objectFit: "cover", maxHeight: 500 }}
                onError={e => { e.target.src = defaultImage; }}
              />
            </Card>
          </Col>

          <Col md={6}> {/* CORRECCIÓN: Se cambió "6" por "6" y se cerró correctamente */}
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
                <h5 className="mb-2">Ubicación:</h5>
                <p className="text-muted">{display.city}</p>
              </div>
            )}

            <div className="mb-4">
              <h5>Cantidad:</h5>
              <InputGroup style={{ maxWidth: 120 }}>
                <Button variant="outline-secondary" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</Button>
                <FormControl
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={e => {
                    const v = parseInt(e.target.value,10);
                    if (!isNaN(v) && v>0) setQuantity(v);
                  }}
                />
                <Button variant="outline-secondary" onClick={() => setQuantity(q => q + 1)}>+</Button>
              </InputGroup>
            </div>

            <div className="d-grid gap-2">
              <Button variant="danger" size="lg" onClick={addToCart}>
                <i className="bi bi-cart-plus me-2" /> Agregar al carrito
              </Button>
              <Button variant="success" size="lg" onClick={buyNow}>
                Comprar ahora
              </Button>
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