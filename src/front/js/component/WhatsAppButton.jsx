import React from "react";

const WhatsAppButton = () => {
  return (
    <>
      {/* Estilos inyectados */}
      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #FFFFFF;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          border: 2px solid #075E54;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 1000;
        }
        .whatsapp-float:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
        .whatsapp-float svg {
          margin-right: 0.6rem;
          fill: #FFFFFF;
        }
        .whatsapp-float span {
          font-weight: 600;
          font-size: 1rem;
        }
        @media (max-width: 576px) {
          .whatsapp-float {
            bottom: 0.75rem;
            right: 0.75rem;
            padding: 0.5rem 1rem;
          }
          .whatsapp-float svg {
            width: 18px;
            height: 18px;
            margin-right: 0.4rem;
          }
          .whatsapp-float span {
            font-size: 0.875rem;
          }
        }
      `}</style>

      {/* Botón */}
      <a
        href="https://api.whatsapp.com/send/?phone=34641363127&text=hola%20buen%20dia%20quiero%20solicitar%20presopuesto%20para%20mi%20boda&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Solicita tu presupuesto por WhatsApp"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.52 3.48A11.716 11.716 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.553 4.186 1.602 6.043L0 24l6.228-1.585A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12 0-3.206-1.25-6.217-3.48-8.52zm-8.52 19.02a9.945 9.945 0 01-5.168-1.397l-.371-.22-3.701.941.984-3.602-.241-.382A9.944 9.944 0 012.04 12C2.04 6.477 6.477 2.04 12 2.04c2.56 0 4.957.986 6.76 2.786A9.53 9.53 0 0121.96 12c0 5.523-4.437 9.48-9.96 9.48zm5.463-7.197c-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.149-.669.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.074-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.607.134-.133.297-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.915-2.21-.24-.579-.486-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.26.489 1.69.626.71.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
        </svg>
        <span>Solicita tu presupuesto</span>
      </a>
    </>
  );
};

export default WhatsAppButton;





