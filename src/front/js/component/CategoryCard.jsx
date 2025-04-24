import React from "react";

const CategoryCard = ({ offer, onViewService, compact = false }) => {
  const {
    title = "Sin título",
    image = "https://via.placeholder.com/300x200?text=Sin+imagen",
    rating = 0,
    reviews = 0,
    discountPrice = 0, // precio con descuento
    price = 0,         // precio original
    buyers = 0,
  } = offer;

  // 🔍 Debug logs
  console.log("Datos recibidos en offer:", offer);
  console.log("discountPrice crudo:", discountPrice, "price crudo:", price);

  // Aseguramos que sean números
  const safeDiscountPrice = Number(discountPrice) || 0;
  const safePrice = Number(price) || 1;

  // Calculamos el descuento de forma segura
  const discount = Math.max(0, Math.round((1 - safeDiscountPrice / safePrice) * 100));

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
          src={image}
          className={`card-img-top ${compact ? "object-fit-cover" : ""}`}
          alt={title}
          style={{ height: compact ? "130px" : "200px", objectFit: "cover" }}
        />

        <span className="position-absolute top-0 end-0 bg-danger text-white small px-2 py-1 m-2 rounded">
          {discount}% OFF
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
                ${safePrice}
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
      `}</style>
    </div>
  );
};

export default CategoryCard;
