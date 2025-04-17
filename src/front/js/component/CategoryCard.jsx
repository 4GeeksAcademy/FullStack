import React from "react";

const CategoryCard = ({ offer, onViewService, compact = false }) => {
  const discount = Math.round(
    (1 - offer.discountPrice / offer.originalPrice) * 100
  );

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
      className={`card h-100 shadow-sm border-0 rounded-4 overflow-hidden ${
        compact ? "p-2" : ""
      }`}
      onClick={() => onViewService(offer)}
      style={{ cursor: "pointer" }}
    >
      <div className="position-relative">
        <img
          src={offer.image}
          className={`card-img-top ${compact ? "object-fit-cover" : ""}`}
          alt={offer.title}
          style={{ height: compact ? "130px" : "200px", objectFit: "cover" }}
        />
        <span className="position-absolute top-0 end-0 bg-danger text-white small px-2 py-1 m-2 rounded">
          {discount}% OFF
        </span>
      </div>

      <div className={compact ? "p-2" : "p-3"}>
        <h5
          className={`fw-bold mb-2 ${
            compact ? "fs-6" : "fs-5"
          } text-truncate card-title-hover`}
        >
          {offer.title}
        </h5>

        <div className="d-flex align-items-center mb-2">
          {renderStars(offer.rating)}
          {!compact && (
            <small className="text-muted ms-2">({offer.reviews})</small>
          )}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex justify-content-start align-items-center mb-1">
            <span
              className={`fw-bold text-danger ${compact ? "fs-6" : "fs-5"}`}
            >
              ${offer.discountPrice}
            </span>
            {!compact && (
              <small className="text-muted text-decoration-line-through ms-2">
                ${offer.originalPrice}
              </small>
            )}
          </div>
          {!compact && (
            <div className="d-flex justify-content-end">
              <small className="text-muted">{offer.buyers} comprados</small>
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
