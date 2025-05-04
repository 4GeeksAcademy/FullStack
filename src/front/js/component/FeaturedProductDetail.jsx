import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import LayoutHeader from "./LayoutHeader.jsx";
import Footer from "./Footer.jsx";

const FeaturedProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [offer, setOffer] = useState(location.state?.offer || null);
  const [loading, setLoading] = useState(!location.state?.offer);

  // Mapeo especial para casos específicos donde los IDs entran en conflicto
  const SPECIAL_CASE_MAPPING = {
    '2-ruta-del-vino-en-mendoza': {
      title: "Ruta del vino en Mendoza",
      descripcion: "Visita las mejores bodegas y degusta vinos exquisitos.",
      image: "https://img.freepik.com/free-photo/cropped-image-couple-toasting-wineglasses_107420-9699.jpg",
      price: 600,
      discountPrice: 850,
      city: "Mendoza",
      rating: 4.3,
      reviews: 190,
      buyers: 270
    }
  };

  useEffect(() => {
    if (offer) return; // Si ya tenemos la oferta del state, no hacemos fetch

    const fetchOffer = async () => {
      try {
        setLoading(true);
        
        // Primero verificar si es un caso especial
        if (SPECIAL_CASE_MAPPING[id]) {
          setOffer(SPECIAL_CASE_MAPPING[id]);
          return;
        }

        // Lógica para IDs temporales
        if (id.startsWith('temp-')) {
          const offerType = id.split('-')[1];
          const offerTitle = id.split('-').slice(2).join(' ');
          
          let category;
          switch(offerType) {
            case 'gast': category = 'gastronomia'; break;
            case 'bell': category = 'belleza'; break;
            case 'viaj': category = 'viajes'; break;
            default: category = '';
          }
          
          // Aquí deberías hacer una llamada a tu API para obtener la oferta por título/categoría
          // Ejemplo simulado:
          const response = await fetch(`/api/offers?title=${encodeURIComponent(offerTitle)}&category=${category}`);
          const data = await response.json();
          
          if (data && data.length > 0) {
            setOffer(data[0]);
          } else {
            navigate("/", { replace: true });
          }
        } else {
          // Para IDs numéricos normales
          const response = await fetch(`/api/offers/${id}`);
          const data = await response.json();
          
          if (data) {
            setOffer(data);
          } else {
            navigate("/", { replace: true });
          }
        }
      } catch (error) {
        console.error("Error fetching offer:", error);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id, navigate, offer]);

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
        <div className="alert alert-warning">No se encontró la oferta solicitada</div>
      </Container>
    );
  }

  // Manejo de precios
  let actualPrice = offer.price || offer.precio || 1000;
  let actualDiscountPrice = offer.discountPrice || Math.round(actualPrice * 0.7);
  
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
                src={offer.image || offer.imagen || "https://via.placeholder.com/500"}
                alt={offer.title || offer.nombre}
                className="img-fluid"
                style={{ 
                  height: "auto", 
                  maxHeight: "500px", 
                  objectFit: "cover",
                  backgroundColor: "#f8f9fa"
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500";
                }}
              />
            </Card>
          </Col>
          <Col md={6}>
            <div className="p-3">
              <h2 className="mb-3">{offer.title || offer.nombre}</h2>
              
              <div className="d-flex align-items-center mb-3">
                {renderStars(offer.rating || 0)}
                <span className="ms-2 text-muted">({offer.reviews || 0} reseñas)</span>
              </div>
              
              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <h3 className="text-danger fw-bold mb-0">${actualDiscountPrice}</h3>
                  <span className="ms-3 text-muted text-decoration-line-through">${actualPrice}</span>
                  <span className="ms-3 badge bg-danger">{finalDiscount}% OFF</span>
                </div>
                <p className="text-success mt-2 mb-0">{offer.buyers || 0} personas ya han comprado esta oferta</p>
              </div>
              
              <div className="mb-4">
                <h5 className="mb-2">Descripción:</h5>
                <p className="text-muted">{offer.descripcion || offer.description || "No hay descripción disponible."}</p>
              </div>
              
              {offer.city && (
                <div className="mb-4">
                  <h5 className="mb-2">Ubicación:</h5>
                  <p className="text-muted">{offer.city}</p>
                </div>
              )}
              
              <Button variant="danger" onClick={() => {}} className="btn-lg w-100 mb-3">
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

export default FeaturedProductDetail;