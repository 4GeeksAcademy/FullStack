import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Spinner,
  FormControl,
  Image,
  Badge,
  Accordion
} from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Context } from "../store/appContext";
import LayoutHeader from "./LayoutHeader.jsx";
import Footer from "./Footer.jsx";
import FAQSection from "./FAQSection.jsx";
import SpecialOffersCarousel from "./SpecialOffersCarousel.jsx";
import RelatedContent2 from "../component/RelatedContent2.jsx";
import { BsCalendarDate, BsHouseDoor, BsCupStraw, BsClock } from "react-icons/bs";

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
  const [selectedImage, setSelectedImage] = useState(0);

  const defaultImage =
    "https://images.unsplash.com/photo-1646166624994-9bd6876e6520?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3";

  const determineCategory = (offerId) => {
    const num = parseInt(offerId, 10);
    if (store.serviciosViajes.some((o) => o.id === num)) return "viajes";
    if (store.serviciosBelleza.some((o) => o.id === num)) return "belleza";
    if (store.serviciosGastronomia.some((o) => o.id === num)) return "gastronomia";
    if (store.serviciosTop.some((o) => o.id === num)) return "top";
    if (store.serviciosOfertas.some((o) => o.id === num)) return "ofertas";
    return "";
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const cat = locationCategory || determineCategory(id);
      setCurrentCategory(cat);
      switch (cat) {
        case "viajes":
          if (!store.serviciosViajes.length) await actions.cargarServiciosViajes();
          break;
        case "belleza":
          if (!store.serviciosBelleza.length) await actions.cargarServiciosBelleza();
          break;
        case "gastronomia":
          if (!store.serviciosGastronomia.length) await actions.cargarServiciosGastronomia();
          break;
        case "top":
          if (!store.serviciosTop.length) await actions.cargarServiciosTop();
          break;
        case "ofertas":
          if (!store.serviciosOfertas.length) await actions.cargarServiciosOfertas();
          break;
      }
      setLoading(false);
    })();
  }, [id, locationCategory, store, actions]);

  // Scroll to top whenever the product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loading) return;
    let data = locationOffer
      ? { ...locationOffer }
      : (store[
          `servicios${currentCategory.charAt(0).toUpperCase()}${currentCategory.slice(1)}`
        ] || []).find((o) => o.id === parseInt(id, 10)) || null;

    if (data) {
      data.image = data.image || defaultImage;
      // si no trae arrays de imágenes, ponemos placeholders
      // data.image2 = data.image2 || defaultImage;
      // data.image3 = data.image3 || defaultImage;
      data.image4 = data.image4 || defaultImage;
      data.image5 = data.image5 || defaultImage;
      setCompleteOffer(processOfferPrices(data));
      setSelectedImage(0);
    } else {
      setCompleteOffer(null);
    }
  }, [loading, currentCategory, id, locationOffer, store]);

  const processOfferPrices = (offer) => {
    let { price, precio, discountPrice, originalPrice, category_id, images = [] } = offer;
    const isBE = category_id !== undefined;

    let p, d;

    if (isBE) {
      // Back-end products: discountPrice = original, price = discounted
      p = discountPrice != null ? Number(discountPrice) : Number(price ?? 0);
      d = price != null ? Number(price) : p;
    } else {
      // Front-end products: originalPrice or precio or price
      p = Number(originalPrice ?? precio ?? price ?? 0);
      d = Number(discountPrice ?? price ?? 0);
    }

    if (!p || p <= 0) p = 1000;
    if (!d || d <= 0 || d >= p) d = Math.round(p * 0.7);

    let pct = Math.round(((p - d) / p) * 100);
    pct = Math.max(5, Math.min(80, pct));

    const imgs = [offer.image, ...images]
      .filter((src) => typeof src === "string" && src.trim() !== "")
      .slice(0, 4);

    return {
      ...offer,
      originalPrice: p,
      discountPrice: d,
      pctOff: pct,
      images: imgs,
      stock: offer.stock ?? 0,
    };
  };

  // Ajuste: mostrar sin decimales y con punto como separador de miles, anteponiendo '€'
  const formatPrice = (valor) => {
    return `€${valor.toLocaleString("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (!completeOffer) {
    return (
      <Container className="my-5 text-center">
        <div className="alert alert-warning">Producto no encontrado</div>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Container>
    );
  }

  const {
    images,
    discountPrice = 0,
    originalPrice = 0,
    pctOff = 0,
    // image2,
    // image3,
    image4,
    image5,
    rating = 0,
    reviews = 0,
    title2 = "",
    descripcion2 = "",
    title3 = "",
    descripcion3 = "",
    stock = 0,
  } = completeOffer;

  const title = completeOffer.title || completeOffer.nombre || "Sin título";
  const desc = completeOffer.descripcion || completeOffer.description || "No hay descripción.";

  const prevImage = () => setSelectedImage((i) => (i - 1 + 3) % 3);
  const nextImage = () => setSelectedImage((i) => (i + 1) % 3);
  const thumbs = [];

  const addToCart = () =>
    actions.addToCart({ ...completeOffer, quantity, category: currentCategory });
  const buyNow = () =>
    navigate("/checkout", {
      state: {
        item: {
          ...completeOffer, // aquí `discountPrice` y `originalPrice` siguen siendo NÚMEROS
          quantity,
          category: currentCategory,
        },
      },
    });

  return (
    <>
      <LayoutHeader />
      <Container className="my-5">
        <Row className="mb-4">
          <Col md={6} className="position-relative">
            <Image
              src={[images[0]][selectedImage]}
              rounded
              fluid
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            {/* 
            <Button
              variant="light"
              className="position-absolute top-50 start-0 translate-middle-y"
              onClick={prevImage}
              style={{ zIndex: 2 }}
            >
              <BsChevronLeft size={28} />
            </Button>
            <Button
              variant="light"
              className="position-absolute top-50 end-0 translate-middle-y"
              onClick={nextImage}
              style={{ zIndex: 2 }}
            >
              <BsChevronRight size={28} />
            </Button>
            */}
            <Row className="mt-3 g-0 d-none d-md-flex">
              {thumbs.map((t, i) => (
                <Col xs={6} key={i} className="px-1">
                  <Image
                    src={t}
                    rounded
                    fluid
                    onClick={() => setSelectedImage(i + 1)}
                    className={selectedImage === i + 1 ? "border border-primary" : ""}
                    style={{ cursor: "pointer", height: "100px", objectFit: "cover" }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1 className="product-title">{title}</h1>
            <div className="d-flex align-items-center mb-3">
              {[...Array(5)].map((_, i) =>
                i < Math.round(rating) ? (
                  <FaStar key={i} className="text-warning me-1" />
                ) : (
                  <FaRegStar key={i} className="text-warning me-1" />
                )
              )}
              <span>
                {(rating ?? 0).toFixed(2)} ({reviews ?? 0} reseñas)
              </span>
            </div>
            <div className="mb-3">
              <div>
                <BsCalendarDate className="me-2" />
                Planificación Personalizada
              </div>
              <div>
                <BsHouseDoor className="me-2" />
                Selección Exquisita de Fincas
              </div>
              <div>
                <BsCupStraw className="me-2" />
                Banquete Gourmet a Medida
              </div>
              <div>
                <BsClock className="me-2" />
                Coordinación Profesional 24/7
              </div>
            </div>
            <div className="d-flex align-items-center mb-4">
              <h2 className="me-3">{formatPrice(discountPrice)}</h2>
              <del className="text-muted me-3">{formatPrice(originalPrice)}</del>
              <Badge bg="success">-{pctOff}% OFF</Badge>
            </div>
            <div className="d-flex align-items-center mb-4">
              <Button variant="outline-secondary" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                –
              </Button>
              <FormControl
                readOnly
                value={quantity}
                className="text-center mx-2"
                style={{ width: "60px" }}
              />
              <Button variant="outline-secondary" onClick={() => setQuantity((q) => q + 1)}>
                +
              </Button>
              <small className="text-muted ms-3"></small>
            </div>
            <div className="d-grid gap-2 mb-3">
              <Button variant="danger" size="lg" onClick={addToCart}>
                Añadir al carrito
              </Button>
              <Button variant="success" size="lg" onClick={buyNow}>
                Comprar ahora
              </Button>
            </div>
            <Accordion className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Visita Virtual Gratis</Accordion.Header>
                <Accordion.Body>recorrido 360º de las fincas antes de elegir.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Soporte 24/7</Accordion.Header>
                <Accordion.Body>whatsapp para resolver cualquier imprevisto.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Garantía de Satisfacción</Accordion.Header>
                <Accordion.Body>ajustes gratuitos hasta 7 días antes del evento.</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        {/* Descripción */}
        <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <h4>Descripción</h4>
          <p style={{ textAlign: "justify" }}>{desc}</p>
        </div>

        {/* Descripciones alternas */}
        <div
          style={{
            border: "1px solid #000",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          <Row className="gx-0 align-items-center" style={{ borderBottom: "1px solid #000" }}>
            <Col md={6} style={{ padding: "2rem" }}>
              <Image src={image4} fluid style={{ width: "100%", display: "block" }} />
            </Col>
            <Col
              md={6}
              className="d-flex flex-column justify-content-center"
              style={{ padding: "2rem", minHeight: "300px" }}
            >
              <h5>{title2}</h5>
              <p style={{ textAlign: "justify" }}>{descripcion2}</p>
            </Col>
          </Row>
          <Row className="gx-0 align-items-center">
            <Col
              md={6}
              className="d-flex flex-column justify-content-center"
              style={{ padding: "2rem", minHeight: "300px" }}
            >
              <h5>{title3}</h5>
              <p style={{ textAlign: "justify" }}>{descripcion3}</p>
            </Col>
            <Col md={6} style={{ padding: "2rem" }}>
              <Image
                src={image5}
                fluid
                style={{ width: "100%", display: "block", maxHeight: "550px" }}
              />
            </Col>
          </Row>
        </div>
      </Container>

      <FAQSection />
      <RelatedContent2 />
      <Footer />
    </>
  );
};

export default ProductDetail;
