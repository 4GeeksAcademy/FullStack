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
  const isBackendService = category_id !== undefined || 
                         (price !== undefined && discountPrice !== undefined && 
                          Number(price) < Number(discountPrice));

  // Imagen por defecto
  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774=";

  // Usar el título correcto (title o nombre)
  const displayTitle = title || nombre || "Sin título";

  // Usar la imagen correcta (image o imagen o default)
  const displayImage = image || imagen || defaultImage;

  // Inicializamos los precios
  let actualPrice = 0;
  let actualDiscountPrice = 0;

  // Lógica para determinar los precios correctos
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

  // Si después de todo esto, seguimos sin precios válidos, asignamos valores por defecto
  if (actualPrice <= 0) actualPrice = 1000;
  if (actualDiscountPrice <= 0) actualDiscountPrice = Math.round(actualPrice * 0.7);

  // Nos aseguramos que el precio con descuento sea menor que el precio original
  if (actualDiscountPrice >= actualPrice && !isBackendService) {
    actualDiscountPrice = Math.round(actualPrice * 0.7); // 30% de descuento por defecto
  }

  // Calculamos el descuento real
  let finalDiscount = Math.round(((actualPrice - actualDiscountPrice) / actualPrice) * 100);

  // Nos aseguramos de que el descuento tenga sentido
  if (finalDiscount < 5) finalDiscount = 5;
  if (finalDiscount > 80) finalDiscount = 80;

  // Modificamos el objeto offer para que estos valores estén disponibles para ProductDetail
  offerCopy.originalPrice = actualPrice;
  offerCopy.discountPrice = actualDiscountPrice;
  offerCopy.price = actualDiscountPrice; // Para consistencia
  offerCopy.image = displayImage; // Aseguramos que la imagen esté en el campo correcto
  
  // Render de estrellas
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"} me-1`}
      ></i>
    ));

  return (
    <div
      className={`card h-100 shadow-sm border-0 rounded-4 overflow-hidden ${compact ? "p-2" : ""}`}
      onClick={() => onViewService(offerCopy)}
      style={{ cursor: "pointer" }}
    >
      <div className="position-relative">
        <img
          src={displayImage}
          className={`card-img-top ${compact ? "object-fit-cover" : ""}`}
          alt={displayTitle}
          style={{
            height: compact ? "130px" : "200px",
            objectFit: "cover",
            width: "100%",
            backgroundColor: "#f0f0f0"
          }}
          onError={(e) => {
            e.target.src = defaultImage;
            console.log("⚠️ Error cargando imagen, usando la predeterminada");
          }}
          loading="lazy"
        />

        {/* Mostramos la etiqueta de descuento con el valor calculado */}
        <span className="position-absolute top-0 end-0 bg-danger text-white small px-2 py-1 m-2 rounded">
          {finalDiscount}% OFF
        </span>
      </div>

      <div className={compact ? "p-2" : "p-3"}>
        <h5 className={`fw-bold mb-2 ${compact ? "fs-6" : "fs-5"} text-truncate card-title-hover`}>
          {displayTitle}
        </h5>

        <div className="d-flex align-items-center mb-2">
          {renderStars(rating)}
          {!compact && <small className="text-muted ms-2">({reviews})</small>}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex justify-content-start align-items-center mb-1">
            <span className={`fw-bold text-danger ${compact ? "fs-6" : "fs-5"}`}>
              ${Number(actualDiscountPrice).toFixed(2)}
            </span>
            {!compact && (
              <small className="text-muted text-decoration-line-through ms-2">
                ${Number(actualPrice).toFixed(2)}
              </small>
            )}
          </div>
          {!compact && (
            <div className="d-flex justify-content-end">
              <small className="text-muted">{buyers} comprados</small>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .card:hover .card-title-hover {
          color: #dc3545;
        }
        .card-img-top {
          transition: opacity 0.3s ease;
        }
        .card-img-top:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};
export default CategoryCard;