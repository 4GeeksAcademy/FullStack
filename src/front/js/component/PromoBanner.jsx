import React from "react";
import { useNavigate } from "react-router-dom";

const PromoBanner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <div
            className="bg-primary bg-gradient rounded-4 overflow-hidden mb-4"
            style={{
              borderRadius: "20px", // Esto fuerza los bordes redondeados independientemente de Bootstrap porque bootstrap no lo aplica con rounded
            }}
          >
            <div className="container text-center py-5 px-3">
              <h3 className="fs-2 fw-bold text-white mb-3">
                ¿Listo para llevar tu boda al siguiente nivel?
              </h3>
              <p className="fs-5 text-light mb-4">
                👉 Descubre Nuestra Guía de “Bodas” y reserva tu asesoría gratuita con nuestro equipo de expertos.
              </p>
              <div className="d-flex justify-content-center">
                <div
                  className="px-4 py-2 rounded-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                 <button onClick={() => navigate("/guia2025")}
  className="btn ms-3 text-white"
>
  Empieza a planificar tu boda hoy!
</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
