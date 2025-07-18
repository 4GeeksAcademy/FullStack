import React from "react";

const CategoryCard = ({ offer, onViewService, compact = false }) => {
  // Crea una copia profunda del objeto offer para no modificar el original
  const offerCopy = JSON.parse(JSON.stringify(offer));
  
  // Extraemos los valores del offer con valores por defecto
  const {
    title = "Sin título",
    nombre, // Nombre alternativo que podría venir del backend
    image,
    imagen, // Nombre alternativo para imagen
    rating = 0,
    reviews = 0,
    price, // Campo "price" del backend
    precio, // Posible alternativa en español
    discountPrice, // Campo que podría estar invertido
    originalPrice, // Por si acaso existe este campo
    buyers = 0,
    // Atributos del backend
    user_id, 
    category_id,
  } = offerCopy;

  // Detectamos si es un servicio que viene del backend (catalogados por categorías)
  const isBackendService =
    category_id !== undefined ||
    (price !== undefined &&
      discountPrice !== undefined &&
      Number(price) < Number(discountPrice));

  // Imagen por defecto
  const defaultImage =
    "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774=";

  // Usar el título correcto (title o nombre)
  const displayTitle = title || nombre || "Sin título";

  // Usar la imagen correcta (image o imagen o default)
  const displayImage = image || imagen || defaultImage;

  // Función para formatear números como euros con punto como separador de miles y sin decimales
  const formatEuros = (num) => {
    const parsed = Number(num);
    const formatted = `€${parsed.toLocaleString("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
    return formatted;
  };

  // Inicializamos los precios
  let actualPrice = 0;
  let actualDiscountPrice = 0;

  // Lógica para determinar los precios correctos
  if (isBackendService) {
    actualPrice = Number(discountPrice) || 0;
    actualDiscountPrice = Number(price) || 0;
  } else {
    if (price !== undefined && discountPrice !== undefined) {
      actualPrice = Number(price) || 0;
      actualDiscountPrice = Number(discountPrice) || 0;
    } else if (originalPrice !== undefined && discountPrice !== undefined) {
      actualPrice = Number(originalPrice) || 0;
      actualDiscountPrice = Number(discountPrice) || 0;
    } else if (price !== undefined) {
      actualPrice = Number(price) || 0;
      actualDiscountPrice = Math.round(actualPrice * 0.7);
    } else if (precio !== undefined) {
      actualPrice = Number(precio) || 0;
      actualDiscountPrice = Math.round(actualPrice * 0.7);
    }
  }

  if (actualPrice <= 0) actualPrice = 1000;
  if (actualDiscountPrice <= 0)
    actualDiscountPrice = Math.round(actualPrice * 0.7);

  if (actualDiscountPrice >= actualPrice && !isBackendService) {
    actualDiscountPrice = Math.round(actualPrice * 0.7);
  }

  let finalDiscount = Math.round(
    ((actualPrice - actualDiscountPrice) / actualPrice) * 100
  );
  if (finalDiscount < 5) finalDiscount = 5;
  if (finalDiscount > 80) finalDiscount = 80;

  const precioOriginalFormateado = formatEuros(actualPrice);
  const precioDescuentoFormateado = formatEuros(actualDiscountPrice);

  offerCopy.originalPrice = actualPrice;
  offerCopy.discountPrice = actualDiscountPrice;
  offerCopy.price = actualDiscountPrice;
  offerCopy.image = displayImage;

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${
          i < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"
        } me-1`}
      ></i>
    ));

  return (
    <div
      className={`card category-card h-100 shadow-sm border-0 rounded-4 overflow-hidden ${
        compact ? "p-2" : ""
      }`}
      onClick={() => onViewService(offerCopy)}
      style={{ cursor: "pointer" }}
    >
      <div className="position-relative">
        <img
          src={displayImage}
          className={`card-img-top category-card-img`}
          alt={displayTitle}
          style={{
            width: "100%",
            backgroundColor: "#f0f0f0",
          }}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
          loading="lazy"
        />
        <span className="position-absolute top-0 end-0 bg-danger text-white small px-2 py-1 m-2 rounded">
          {finalDiscount}% OFF
        </span>
      </div>

      <div className={compact ? "p-2" : "p-3"}>
        <h5
          className={`fw-bold mb-2 ${compact ? "fs-6" : "fs-5"} text-truncate card-title-hover`}
        >
          {displayTitle}
        </h5>

        <div className="d-flex align-items-center mb-2">
          {renderStars(rating)}
          {!compact && <small className="text-muted ms-2">({reviews})</small>}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex justify-content-start align-items-center mb-1">
            <span className={`fw-bold text-danger ${compact ? "fs-6" : "fs-5"}`}>
              {precioDescuentoFormateado}
            </span>
            {!compact && (
              <small className="text-muted text-decoration-line-through ms-2">
                {precioOriginalFormateado}
              </small>
            )}
          </div>
          {!compact && (
            <div className="d-flex justify-content-end">
              <small className="text-muted">{buyers}</small>
            </div>
          )}
        </div>
      </div>

      {/* Reglas CSS específicas para ajustar altura y tamaño de carta según ancho de pantalla */}
      <style>{`
        /* ----------------------------------------
           MÓVIL PEQUEÑO (<568px): 1 tarjeta por fila,
           Reducir padding y fuente para hacerlo más pequeño
           + espaciado a la derecha entre cartas en móvil
        ---------------------------------------- */
        @media (max-width: 360px) {
          .category-card {
            width: 140px !important;
            font-size: 10px !important;
            margin-right: 12px; /* espacio a la derecha solo en móvil */
          }
          .category-card h5.card-title-hover {
            font-size: 0.75rem !important;
          }
          .category-card .text-danger {
            font-size: 0.9rem !important;
          }
          .category-card .text-muted.text-decoration-line-through {
            font-size: 0.75rem !important;
          }
          .category-card i.bi-star-fill,
          .category-card i.bi-star {
            font-size: 0.75rem !important;
          }
        }

        /* ----------------------------------------
           PHONE GRANDE (>=568px y <768px): 2 tarjetas por fila
        ---------------------------------------- */
        @media (min-width: 568px) and (max-width: 767.98px) {
          .category-card-img {
            height: 200px !important;
            object-fit: cover !important;
          }
        }

        /* ----------------------------------------
           TABLET (>=768px y <992px): 3 tarjetas por fila
        ---------------------------------------- */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .category-card-img {
            height: 240px !important;
            object-fit: cover !important;
          }
        }

        /* ----------------------------------------
           DESKTOP (>=992px): 4 tarjetas por fila
        ---------------------------------------- */
        @media (min-width: 992px) {
          .category-card-img {
            height: ${compact ? "130px" : "240px"} !important;
            object-fit: cover !important;
          }
        }

        /* Detalle visual cuando se hace hover sobre el título */
        .card:hover .card-title-hover {
          color: #dc3545;
        }
        /* Efecto de opacidad al pasar el mouse sobre la imagen */
        .category-card-img {
          transition: opacity 0.3s ease;
        }
        .category-card-img:hover {
          opacity: 0.9;
        }

        /* ----------------------------------------
           AJUSTE PARA PANTALLAS MUY GRANDES (>1920px)
           Para no cortar la imagen, mostrarla completa
        ---------------------------------------- */
        @media (min-width: 1920px) {
          .category-card-img {
            height: auto !important;
            object-fit: contain !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryCard;
