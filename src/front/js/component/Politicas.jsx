import React from "react";

const Politicas = ({ title = "Política de Privacidad", content = "Aquí va el contenido de la política." }) => {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      <div className="card-body text-center">
        {/* Título */}
        <h3 className="fw-bold mb-4">{title}</h3>
        
        {/* Contenido */}
        <p className="text-muted mb-4" style={{ whiteSpace: "pre-wrap" }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Politicas;
