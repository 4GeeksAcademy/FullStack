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

    if (locationOffer) {
      setCompleteOffer(locationOffer);
      return;
    }

    const numId = parseInt(id, 10);
    let list = [];
    switch (currentCategory) {
      case 'viajes':
        list = store.serviciosViajes; break;
      case 'belleza':
        list = store.serviciosBelleza; break;
      case 'gastronomia':
        list = store.serviciosGastronomia; break;
      case 'top':
        list = store.serviciosTop; break;
      case 'ofertas':
        list = store.serviciosOfertas; break;
      default:
        list = [];
    }

    setCompleteOffer(list.find(o => o.id === numId) || null);
  }, [loading, currentCategory, id, locationOffer, store]);

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

  const addToCart = () => {
    actions.addToCart({
      ...display,
      originalPrice: original,
      discountPrice,
      quantity
    });
  };
  const buyNow = () => {
    navigate("/checkout", {
      state: { item: { ...display, originalPrice: original, discountPrice, quantity } }
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
            <h2 className="mb-3">{title}</h2>
            <div className="mb-3 d-flex align-items-center">
              {renderStars()}
              <span className="ms-2 text-muted">({display.reviews||0} reseñas)</span>
            </div>

            <div className="mb-4">
              <h3 className="text-danger fw-bold mb-0">${discountPrice}</h3>
              <span className="ms-3 text-muted text-decoration-line-through">${original}</span>
              {pctOff > 0 && <span className="ms-3 badge bg-danger">{pctOff}% OFF</span>}
            </div>
            <p className="text-success mb-4">
              {display.buyers||0} personas ya han comprado esta oferta
            </p>

            <h5>Descripción:</h5>
            <p className="text-muted">{desc}</p>

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
    </>
  );
};

export default ProductDetail;
