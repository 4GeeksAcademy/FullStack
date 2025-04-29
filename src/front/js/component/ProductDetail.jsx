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

  // Cargar todos los datos de productos si no están cargados
  useEffect(() => {
    const loadAllData = async () => {
      // Cargar todos los tipos de servicios si no están cargados
      if (store.serviciosBelleza.length === 0) await actions.cargarServiciosBelleza();
      if (store.serviciosGastronomia.length === 0) await actions.cargarServiciosGastronomia();
      if (store.serviciosViajes.length === 0) await actions.cargarServiciosViajes();
      if (store.serviciosOfertas.length === 0) await actions.cargarServiciosOfertas();
    };
    
    loadAllData();
  }, []);

  // Buscar el producto completo en el store cuando tenemos todos los datos
  useEffect(() => {
    if (!offer) return;
    
    // Función para encontrar un producto en una lista de servicios
    const findProductInList = (productList) => {
      return productList.find(item => {
        // Intentar coincidir por ID si existe
        if (offer.id && item.id === offer.id) return true;
        
        // Intentar coincidir por título/nombre
        const offerTitle = offer.title || offer.nombre || "";
        const itemTitle = item.title || item.nombre || "";
        if (offerTitle && itemTitle && offerTitle === itemTitle) return true;
        
        return false;
      });
    };

    // Buscar en todas las categorías
    const allCategories = [
      ...store.serviciosBelleza,
      ...store.serviciosGastronomia,
      ...store.serviciosViajes,
      ...store.serviciosOfertas
    ];
    
    // Buscar producto completo
    const foundProduct = findProductInList(allCategories);
    
    if (foundProduct) {
      console.log("Producto completo encontrado en el store:", foundProduct);
      setCompleteOffer(foundProduct);
    } else {
      // Si no encontramos el producto completo, usamos la oferta original
      setCompleteOffer(offer);
    }
    
  }, [offer, store.serviciosBelleza, store.serviciosGastronomia, store.serviciosViajes, store.serviciosOfertas]);

  // Si no tenemos oferta, mostramos mensaje de error
  if (!offer) {
    return (
      <Container className="my-5">
        <div className="alert alert-warning">No se encontraron detalles del producto</div>
      </Container>
    );
  }

  // Usamos los datos completos si están disponibles, o los datos originales si no
  const displayData = completeOffer || offer;
  
  // Normalizamos los datos para asegurarnos que tenemos valores consistentes
  const displayTitle = displayData.title || displayData.nombre || "Sin título";
  const displayImage = displayData.image || displayData.imagen || "https://via.placeholder.com/500x400?text=Sin+imagen";
  
  // Extraer la descripción directamente del objeto completo
  const displayDescription = displayData.descripcion || displayData.description || "No hay descripción disponible para este producto.";
  
  console.log("Objeto usado para mostrar:", displayData);
  console.log("Descripción encontrada:", displayDescription);
  
  // Manejar los precios
  let actualPrice = 0;
  let actualDiscountPrice = 0;

  // Determinar precios siguiendo la misma lógica que CategoryCard
  if (displayData.price !== undefined && displayData.discountPrice !== undefined) {
    // Si tenemos ambos precios, verificamos cuál es mayor (el mayor debe ser el original)
    if (Number(displayData.price) < Number(displayData.discountPrice)) {
      actualDiscountPrice = Number(displayData.price);
      actualPrice = Number(displayData.discountPrice);
    } else {
      actualPrice = Number(displayData.price);
      actualDiscountPrice = Number(displayData.discountPrice);
    }
  } else if (displayData.price !== undefined) {
    actualDiscountPrice = Number(displayData.price);
    actualPrice = Math.round(actualDiscountPrice * 1.5);
  } else if (displayData.precio !== undefined) {
    actualDiscountPrice = Number(displayData.precio);
    actualPrice = Math.round(actualDiscountPrice * 1.5);
  } else if (displayData.discountPrice !== undefined) {
    actualDiscountPrice = Number(displayData.discountPrice);
    actualPrice = displayData.originalPrice ? Number(displayData.originalPrice) : Math.round(actualDiscountPrice * 1.5);
  } else if (displayData.originalPrice !== undefined) {
    actualPrice = Number(displayData.originalPrice);
    actualDiscountPrice = Math.round(actualPrice * 0.7);
  }

  // Si después de todo esto, seguimos sin precios válidos, asignamos valores por defecto
  if (actualPrice <= 0) actualPrice = 1000;
  if (actualDiscountPrice <= 0) actualDiscountPrice = Math.round(actualPrice * 0.7);

  // Nos aseguramos que el precio con descuento sea menor que el precio original
  if (actualDiscountPrice >= actualPrice) {
    actualDiscountPrice = Math.round(actualPrice * 0.7);
  }

  // Calculamos el descuento
  const finalDiscount = Math.round(((actualPrice - actualDiscountPrice) / actualPrice) * 100);
  
  // Función para agregar al carrito
  const addToCart = () => {
    actions.addToCart({
      ...displayData,
      discountPrice: actualDiscountPrice,
      originalPrice: actualPrice
    });
    alert("Producto agregado al carrito");
  };

  // Render de estrellas
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
          {/* Card con la imagen del producto */}
          <Card style={{ width: "100%" }}>
            <Card.Img
              variant="top"
              src={displayImage}
              alt={displayTitle}
              className="img-fluid"
              style={{ height: "auto", maxHeight: "500px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500x400?text=Sin+imagen";
              }}
            />
          </Card>
        </Col>
        <Col md={6}>
          {/* Detalles del producto */}
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
            
            {/* Botón para comprar */}
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