import React from "react";

const CategoryCard = ({ offer, onViewService, compact = false }) => {
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
  } = offer;

  // Imagen por defecto
  const defaultImage = "https://images.unsplash.com/photo-1526397751294-331021109fbd";

  // Usar el título correcto (title o nombre)
  const displayTitle = title || nombre || "Sin título";

  // Usar la imagen correcta (image o imagen)
  const displayImage = image || imagen || defaultImage;

  // Detectamos qué campos de precio existen y los normalizamos
  let actualPrice = 0;
  let actualDiscountPrice = 0;

  // Determinar cuál es el precio original y cuál el precio con descuento
  if (price !== undefined && discountPrice !== undefined) {
    // Si tenemos ambos precios, verificamos cuál es mayor (el mayor debe ser el original)
    if (Number(price) < Number(discountPrice)) {
      // Si price es menor que discountPrice, entonces price es el precio con descuento
      actualDiscountPrice = Number(price);
      actualPrice = Number(discountPrice);
    } else {
      // En caso contrario, asumimos que los campos están correctamente nombrados
      actualPrice = Number(price);
      actualDiscountPrice = Number(discountPrice);
    }
  } else if (price !== undefined) {
    // Si solo tenemos price, lo usamos como precio con descuento y calculamos un precio original
    actualDiscountPrice = Number(price);
    actualPrice = Math.round(actualDiscountPrice * 1.5);
  } else if (precio !== undefined) {
    // Si tenemos precio (en español), lo usamos como precio con descuento
    actualDiscountPrice = Number(precio);
    actualPrice = Math.round(actualDiscountPrice * 1.5);
  } else if (discountPrice !== undefined) {
    // Si solo tenemos discountPrice, lo usamos como precio con descuento
    actualDiscountPrice = Number(discountPrice);
    actualPrice = Math.round(actualDiscountPrice * 1.5);
  } else if (originalPrice !== undefined) {
    // Si tenemos originalPrice pero ningún precio con descuento, calculamos uno
    actualPrice = Number(originalPrice);
    actualDiscountPrice = Math.round(actualPrice * 0.7); // 30% de descuento
  }

  // Si después de todo esto, seguimos sin precios válidos, asignamos valores por defecto
  if (actualPrice <= 0) actualPrice = 1000;
  if (actualDiscountPrice <= 0) actualDiscountPrice = Math.round(actualPrice * 0.7);

  // Nos aseguramos que el precio con descuento sea menor que el precio original
  if (actualDiscountPrice >= actualPrice) {
    actualDiscountPrice = Math.round(actualPrice * 0.7); // 30% de descuento por defecto
  }

  // Calculamos el descuento real
  let finalDiscount = Math.round(((actualPrice - actualDiscountPrice) / actualPrice) * 100);

  // Nos aseguramos de que el descuento tenga sentido
  if (finalDiscount < 5) finalDiscount = 5;
  if (finalDiscount > 80) finalDiscount = 80;

  // Render de estrellas
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"} me-1`}
      ></i>
    ));

  // Depuración para ver los valores calculados
  // console.log(`Card "${displayTitle}": 
  //   Original data - price: ${price}, discountPrice: ${discountPrice}, precio: ${precio}
  //   Calculated - actualPrice: ${actualPrice}, actualDiscountPrice: ${actualDiscountPrice}, discount: ${finalDiscount}%`);

  return (
    <div
      className={`card h-100 shadow-sm border-0 rounded-4 overflow-hidden ${compact ? "p-2" : ""}`}
      onClick={() => onViewService(offer)}
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
              ${actualDiscountPrice}
            </span>
            {!compact && (
              <small className="text-muted text-decoration-line-through ms-2">
                ${actualPrice}
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