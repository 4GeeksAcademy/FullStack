import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Context } from "../store/appContext";
import LayoutHeader from "./LayoutHeader.jsx";
import Footer from "./Footer.jsx";

const ProductDetail = () => {
  const location = useLocation();
  const { offer } = location.state || {};
  const { store, actions } = useContext(Context);
  const [completeOffer, setCompleteOffer] = useState(null);

  // Imagen por defecto (puedes cambiarla por tu no-image.jpg)
  const defaultImage = "https://img.freepik.com/free-photo/beautiful-shot-green-forest-trees-with-wooden-path_181624-20615.jpg";

  // Cargar todos los datos de productos si no están cargados
  useEffect(() => {
    const loadAllData = async () => {
      if (store.serviciosBelleza.length === 0) await actions.cargarServiciosBelleza();
      if (store.serviciosGastronomia.length === 0) await actions.cargarServiciosGastronomia();
      if (store.serviciosViajes.length === 0) await actions.cargarServiciosViajes();
      if (store.serviciosOfertas.length === 0) await actions.cargarServiciosOfertas();
    };
    
    loadAllData();
  }, []);

  // Buscar el producto completo en el store
  useEffect(() => {
    if (!offer) return;
    
    const findProductInList = (productList) => {
      return productList.find(item => {
        if (offer.id && item.id === offer.id) return true;
        const offerTitle = offer.title || offer.nombre || "";
        const itemTitle = item.title || item.nombre || "";
        return offerTitle && itemTitle && offerTitle === itemTitle;
      });
    };

    const allCategories = [
      ...store.serviciosBelleza,
      ...store.serviciosGastronomia,
      ...store.serviciosViajes,
      ...store.serviciosOfertas
    ];
    
    const foundProduct = findProductInList(allCategories);
    setCompleteOffer(foundProduct || offer);
    
  }, [offer, store.serviciosBelleza, store.serviciosGastronomia, store.serviciosViajes, store.serviciosOfertas]);

  if (!offer) {
    return (
      <Container className="my-5">
        <div className="alert alert-warning">No se encontraron detalles del producto</div>
      </Container>
    );
  }

  const displayData = completeOffer || offer;
  const displayTitle = displayData.title || displayData.nombre || "Sin título";
  const displayImage = displayData.image || displayData.imagen || defaultImage;
  const displayDescription = displayData.descripcion || displayData.description || "No hay descripción disponible.";

  // Manejo de precios simplificado
  let actualPrice = displayData.price || displayData.precio || displayData.originalPrice || 1000;
  let actualDiscountPrice = displayData.discountPrice || Math.round(actualPrice * 0.7);
  
  if (actualDiscountPrice >= actualPrice) {
    actualDiscountPrice = Math.round(actualPrice * 0.7);
  }

  const finalDiscount = Math.round(((actualPrice - actualDiscountPrice) / actualPrice) * 100);
  
  const addToCart = () => {
    actions.addToCart({
      ...displayData,
      discountPrice: actualDiscountPrice,
      originalPrice: actualPrice
    });
  };

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
              {/* Imagen simplificada - sin manejo de errores */}
              <Card.Img
                variant="top"
                src={displayImage}
                alt={displayTitle}
                className="img-fluid"
                style={{ 
                  height: "auto", 
                  maxHeight: "500px", 
                  objectFit: "cover",
                  backgroundColor: "#f8f9fa" // Fondo por si la imagen no carga
                }}
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
              
              <Button variant="danger" onClick={addToCart} className="btn-lg w-100 mb-3">
                Agregar al carrito
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
    </>
  );
};

export default ProductDetail;