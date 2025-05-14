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
  const [quantity, setQuantity] = useState(1);

  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774=";

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
    (async () => {
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
      }

      setLoading(false);
    })();
  }, [id, locationCategory, store, actions]);

  useEffect(() => {
    if (loading) return;
    
    if (locationOffer) {
      // Aseguramos que la imagen tenga un valor
      const offerWithImage = {
        ...locationOffer,
        image: locationOffer.image || locationOffer.imagen || defaultImage
      };
      // Procesamos los precios igual que en CategoryCard
      const processedOffer = processOfferPrices(JSON.parse(JSON.stringify(offerWithImage)));
      setCompleteOffer(processedOffer);
      return;
    }
    
    const numId = parseInt(id, 10);
    const list = store[`servicios${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`] || [];
    const foundOffer = list.find(o => o.id === numId) || null;
    
    if (foundOffer) {
      // Procesamos la oferta con la misma lógica que en CategoryCard
      const processedOffer = processOfferPrices(JSON.parse(JSON.stringify(foundOffer)));
      processedOffer.image = processedOffer.image || processedOffer.imagen || defaultImage;
      setCompleteOffer(processedOffer);
    } else {
      setCompleteOffer(null);
    }
  }, [loading, currentCategory, id, locationOffer, store]);

  // Función idéntica a la usada en CategoryCard para procesar precios
  const processOfferPrices = (offerCopy) => {
    const {
      price,
      precio,
      discountPrice,
      originalPrice,
      category_id,
    } = offerCopy;

    const isBackendService = category_id !== undefined || 
                          (price !== undefined && discountPrice !== undefined && 
                           Number(price) < Number(discountPrice));

    let actualPrice = 0;
    let actualDiscountPrice = 0;

    if (isBackendService) {
      // Para servicios del backend, donde price y discountPrice están invertidos
      actualPrice = Number(discountPrice) || 0;
      actualDiscountPrice = Number(price) || 0;
    } else {
      // Para servicios creados por usuarios
      if (price !== undefined && discountPrice !== undefined) {
        actualPrice = Number(price) || 0;
        actualDiscountPrice = Number(discountPrice) || 0;
      } else if (originalPrice !== undefined && discountPrice !== undefined) {
        actualPrice = Number(originalPrice) || 0;
        actualDiscountPrice = Number(discountPrice) || 0;
      } else if (price !== undefined) {
        actualPrice = Number(price) || 0;
        actualDiscountPrice = Math.round(actualPrice * 0.7); // 30% de descuento
      } else if (precio !== undefined) {
        actualPrice = Number(precio) || 0;
        actualDiscountPrice = Math.round(actualPrice * 0.7);
      }
    }

    // Valores por defecto si no hay precios válidos
    if (actualPrice <= 0) actualPrice = 1000;
    if (actualDiscountPrice <= 0) actualDiscountPrice = Math.round(actualPrice * 0.7);

    // Asegurar que el precio con descuento sea menor que el original
    if (actualDiscountPrice >= actualPrice && !isBackendService) {
      actualDiscountPrice = Math.round(actualPrice * 0.7);
    }

    // Calcular el porcentaje de descuento
    let finalDiscount = Math.round(((actualPrice - actualDiscountPrice) / actualPrice) * 100);
    if (finalDiscount < 5) finalDiscount = 5;
    if (finalDiscount > 80) finalDiscount = 80;

    // Actualizar el objeto offer con los precios procesados
    return {
      ...offerCopy,
      originalPrice: actualPrice,
      discountPrice: actualDiscountPrice,
      price: actualDiscountPrice, // Para consistencia
      pctOff: finalDiscount
    };
  };

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
          No se encontraron detalles del producto en "{currentCategory}"
        </div>
      </Container>
    );
  }

  const display = completeOffer;
  const title = display.title || display.nombre || "Sin título";
  const image = display.image || display.imagen || defaultImage;
  const desc = display.descripcion || display.description || "No hay descripción disponible.";

  // Precios procesados (aseguramos que no sean cero)
  const original = display.originalPrice > 0 ? display.originalPrice : 1000;
  const discountPrice = display.discountPrice > 0 ? display.discountPrice : Math.round(original * 0.7);
  const pctOff = display.pctOff || Math.round(((original - discountPrice) / original) * 100);

  const addToCart = () => {
    actions.addToCart({
      ...display,
      quantity,
      category: currentCategory
    });
  };

  const buyNow = () => {
    navigate("/checkout", {
      state: {
        item: {
          ...display,
          quantity,
          category: currentCategory
        }
      }
    });
  };

  const renderStars = () =>
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

          <Col md={6}>
            <h2 className="mb-3" style={{ wordWrap: 'break-word' }}>{title}</h2>
            <div className="mb-3 d-flex align-items-center">
              {renderStars()}
              <span className="ms-2 text-muted">({display.reviews||0} reseñas)</span>
            </div>

            <div className="mb-4 d-flex align-items-center">
              {/* Precio con descuento (rojo) - igual que en CategoryCard */}
              <h3 className="text-danger fw-bold mb-0">${discountPrice.toFixed(2)}</h3>
              
              {/* Precio original tachado - solo si hay descuento */}
              {discountPrice < original && (
                <span className="ms-3 text-muted text-decoration-line-through fs-5">
                  ${original.toFixed(2)}
                </span>
              )}
              
              {/* Badge de descuento - solo si hay descuento */}
              {discountPrice < original && (
                <span className="ms-3 badge bg-danger">{pctOff}% OFF</span>
              )}
            </div>
            
            <p className="text-success mb-4">
              {display.buyers||0} personas ya han comprado esta oferta
            </p>

            <h5>Descripción:</h5>
            <p className="text-muted" style={{ wordWrap: 'break-word' }}>{desc}</p>

            {display.city && (
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
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v > 0) setQuantity(v);
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
    </>
  );
};

export default ProductDetail;