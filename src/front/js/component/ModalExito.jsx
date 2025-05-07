import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalExito = ({ show, onClose, mensaje, redireccionar }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  return createPortal(
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      role="dialog" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¡Servicio creado!</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>{mensaje}</p>
          </div>
          <div className="modal-footer">
            
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={redireccionar}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalExito;