import React from "react";

const CategoryCard = ({ offer, onViewService, compact = false }) => {
  const {
    title = "Sin título",
    image,
    rating = 0,
    reviews = 0,
    discountPrice = 0,
    price = 0,
    buyers = 0,
  } = offer;

  // Imagen por defecto
  const defaultImage = "https://images.unsplash.com/photo-1526397751294-331021109fbd";

  // Debug de los valores recibidos
  console.log("📦 Datos completos recibidos:", offer);
  console.log("💰 Price original:", price, typeof price);
  console.log("🏷️ DiscountPrice:", discountPrice, typeof discountPrice);

  // Aseguramos que sean números
  const safeDiscountPrice = Number(discountPrice) || 0;
  
  // Si no tenemos precio original, generamos uno basado en un descuento aleatorio
  // usando un valor basado en el título o ID para que sea consistente
  const generateVariedDiscount = () => {
    const titleSum = title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const lastDigit = safeDiscountPrice % 10;
    return 10 + (titleSum + lastDigit) % 36; // Entre 10% y 45%
  };
  
  const randomDiscount = generateVariedDiscount();
  const calculatedMultiplier = 100 / (100 - randomDiscount);
  const calculatedOriginalPrice = Math.round(safeDiscountPrice * calculatedMultiplier);
  
  // Usamos el precio original si existe, sino el calculado
  const safeOriginalPrice = Number(price) > 0 ? Number(price) : calculatedOriginalPrice;

  console.log("🔢 SafeOriginalPrice (después de calcular):", safeOriginalPrice);
  console.log("🔢 SafeDiscountPrice:", safeDiscountPrice);
  
  // CALCULO REAL DEL DESCUENTO:
  // Calculamos el descuento exacto basado en la diferencia entre los precios
  // Solo si ambos precios son mayores que cero
  let finalDiscount;
  
  if (safeOriginalPrice > 0 && safeDiscountPrice > 0) {
    // Fórmula: (1 - precioConDescuento/precioOriginal) * 100
    finalDiscount = Math.round((1 - safeDiscountPrice / safeOriginalPrice) * 100);
    console.log("📊 Descuento calculado con la fórmula:", finalDiscount);
  } else {
    finalDiscount = randomDiscount;
    console.log("📊 Usando descuento aleatorio:", finalDiscount);
  }
  
  // Aseguramos que el descuento sea positivo
  finalDiscount = Math.max(0, finalDiscount);
  
  console.log("🏷️ Porcentaje descuento final mostrado:", finalDiscount);

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
      onClick={() => onViewService(offer)}
      style={{ cursor: "pointer" }}
    >
      <div className="position-relative">
        <img
          src={image || defaultImage}
          className={`card-img-top ${compact ? "object-fit-cover" : ""}`}
          alt={title}
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
          {title}
        </h5>

        <div className="d-flex align-items-center mb-2">
          {renderStars(rating)}
          {!compact && <small className="text-muted ms-2">({reviews})</small>}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex justify-content-start align-items-center mb-1">
            <span className={`fw-bold text-danger ${compact ? "fs-6" : "fs-5"}`}>
              ${safeDiscountPrice}
            </span>
            {!compact && (
              <small className="text-muted text-decoration-line-through ms-2">
                ${safeOriginalPrice}
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