import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Context } from "../store/appContext";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";

const categoryConfig = {
  viajes:      { listKey: "serviciosViajes",      loader: "cargarServiciosViajes" },
  belleza:     { listKey: "serviciosBelleza",     loader: "cargarServiciosBelleza" },
  gastronomia: { listKey: "serviciosGastronomia", loader: "cargarServiciosGastronomia" },
  top:         { listKey: "serviciosTop",         loader: "cargarServiciosTop" },
  ofertas:     { listKey: "serviciosOfertas",     loader: "cargarServiciosOfertas" },
};

const renderStars = (rating = 0) =>
  Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"} me-1`}
    />
  ));

const ProductDetailBusqueda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category: locCat, id } = useParams();
  const { offer: locationOffer } = location.state || {};
  const { store, actions } = useContext(Context);

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(locCat);

  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg";

  // Determina categoría según el id si viene de URL
  useEffect(() => {
    if (!locCat && id) {
      // intenta inferir de store
      if (store.serviciosViajes.some(o => o.id === +id)) setCurrentCategory("viajes");
      else if (store.serviciosBelleza.some(o => o.id === +id)) setCurrentCategory("belleza");
      else if (store.serviciosGastronomia.some(o => o.id === +id)) setCurrentCategory("gastronomia");
      else if (store.serviciosTop.some(o => o.id === +id)) setCurrentCategory("top");
      else if (store.serviciosOfertas.some(o => o.id === +id)) setCurrentCategory("ofertas");
    }
  }, [locCat, id, store]);

  // Carga datos de la categoría
  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      const cfg = categoryConfig[currentCategory];
      if (!cfg) return setLoading(false);
      if (store[cfg.listKey].length === 0) {
        await actions[cfg.loader]();
      }
      setLoading(false);
    };
    loadCategory();
  }, [currentCategory, store, actions]);

  // Busca el offer dentro de la lista cargada
  useEffect(() => {
    if (loading) return;
    let found = null;
    if (locationOffer) {
      found = locationOffer;
    } else {
      const list = store[categoryConfig[currentCategory]?.listKey] || [];
      const nid = parseInt(id, 10);
      found = list.find(o => o.id === nid) || null;
    }
    setOffer(found);
  }, [loading, locationOffer, id, store, currentCategory]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (!offer) {
    return (
      <Container className="my-5">
        <div className="alert alert-warning">
          Producto no encontrado en la categoría “{currentCategory}”
        </div>
      </Container>
    );
  }

  // Normaliza precios y descuento
  const original = offer.originalPrice ?? offer.price ?? offer.precio ?? 0;
  let discount = offer.discountPrice ?? Math.round(original * 0.7);
  if (discount >= original) discount = Math.round(original * 0.7);
  const pctOff = original > 0 ? Math.round((original - discount) / original * 100) : 0;

  const addToCart = () => {
    actions.addToCart({
      ...offer,
      discountPrice: discount,
      originalPrice: original
    });
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { item: { ...offer, discountPrice: discount, originalPrice: original } } });
  };

  return (
    <>
      <LayoutHeader />
      <Container className="my-5">
        <Row>
          <Col md={6} className="d-flex justify-content-center mb-4">
            <Card style={{ width: "100%" }}>
              <Card.Img
                variant="top"
                src={offer.image || defaultImage}
                alt={offer.title}
                className="img-fluid"
                style={{ objectFit: "cover", maxHeight: 500 }}
                onError={e => e.currentTarget.src = defaultImage}
              />
            </Card>
          </Col>
          <Col md={6}>
            <div className="p-3">
              <h2 className="mb-3">{offer.title}</h2>
              {/* Estrellas y reseñas */}
              <div className="d-flex align-items-center mb-3">
                {renderStars(offer.rating)}
                <span className="ms-2 text-muted">({offer.reviews ?? 0} reseñas)</span>
              </div>
              {/* Precios */}
              <div className="d-flex align-items-center mb-4">
                <h3 className="text-danger fw-bold mb-0">${discount}</h3>
                <span className="ms-3 text-muted text-decoration-line-through">${original}</span>
                {pctOff > 0 && <span className="ms-3 badge bg-danger">{pctOff}% OFF</span>}
              </div>
              {/* Compradores */}
              <p className="text-success mt-2 mb-4">
                {offer.buyers ?? 0} personas ya han comprado esta oferta
              </p>
              {/* Descripción y ubicación */}
              <div className="mb-4">
                <h5 className="mb-2">Descripción:</h5>
                <p className="text-muted">{offer.descripcion ?? offer.description}</p>
              </div>
              {offer.city && (
                <div className="mb-4">
                  <h5 className="mb-2">Ubicación:</h5>
                  <p className="text-muted">{offer.city}</p>
                </div>
              )}
              {/* Botones */}
              <div className="d-grid gap-2 mt-4">
                <Button variant="danger" size="lg" onClick={addToCart}>
                  <i className="bi bi-cart-plus me-2" /> Agregar al carrito
                </Button>
                <Button variant="success" size="lg" onClick={handleBuyNow}>
                  Comprar ahora
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailBusqueda;

