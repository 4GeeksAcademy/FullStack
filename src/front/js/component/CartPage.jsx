import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LayoutHeader from '../component/LayoutHeader.jsx';
import WhatsAppButton from "../component/WhatsAppButton.jsx";

const CartPage = () => {
  const { store, actions } = useContext(Context);
  const cartItems = store.cartItems || [];
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastProgress, setToastProgress] = useState(100);

  // Carga inicial del carrito
  useEffect(() => {
    actions.loadCartFromLocalStorage();
  }, []);

  // Persistir cambios
  useEffect(() => {
    actions.saveCartToLocalStorage();
  }, [cartItems]);

  const handleUpdateQuantity = (id, category, title, change) => {
    const item = cartItems.find(ci =>
      ci.id === id && ci.category === category && ci.title === title
    );
    if (!item) return;
    const newQty = item.quantity + change;
    if (newQty < 1 || newQty > 20) return;
    actions.updateQuantity(id, category, title, newQty);
  };

  const handleRemoveItem = (id, category, title) => {
    const selected = cartItems.find(ci =>
      ci.id === id && ci.category === category && ci.title === title
    );
    if (selected) {
      setItemToRemove(selected);
      setShowModal(true);
    }
  };

  const confirmRemoveItem = () => {
    if (!itemToRemove) return;
    actions.removeItemFromCart(
      itemToRemove.id,
      itemToRemove.category,
      itemToRemove.title
    );
    setShowModal(false);
    setToastMessage(`Producto eliminado: ${itemToRemove.title}`);
    setToastVisible(true);
    setToastProgress(100);
    let prog = 100;
    const iv = setInterval(() => {
      prog -= 2;
      setToastProgress(prog);
      if (prog <= 0) {
        clearInterval(iv);
        setToastVisible(false);
      }
    }, 50);
  };

  const handleEmptyCart = () => setShowEmptyCartModal(true);
  const confirmEmptyCart = () => {
    setShowEmptyCartModal(false);
    actions.emptyCart();
    setToastMessage("Carrito vaciado");
    setToastVisible(true);
    setToastProgress(100);
    let prog = 100;
    const iv = setInterval(() => {
      prog -= 2;
      setToastProgress(prog);
      if (prog <= 0) {
        clearInterval(iv);
        setToastVisible(false);
      }
    }, 50);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0
  );

  const isLogged = () => !!localStorage.getItem("token");
  const handleProceedToPayment = () => {
    isLogged() ? navigate('/checkout') : navigate('/login');
  };

  // Imagen por defecto para casos donde no haya imagen
  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774=";

  return (
    <div>
      <LayoutHeader />
      <WhatsAppButton />
      <div className="container py-5 position-relative">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Cart</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            <i className="bi bi-house-door me-2"></i>Volver al inicio
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-3">Your Cart is Empty</p>
            <button className="btn btn-danger" onClick={() => navigate('/')}>
              Browse Offers
            </button>
          </div>
        ) : (
          <>
            {/* Lista de ítems */}
            <div className="list-group mb-4">
              {cartItems.map(item => (
                <div
                  key={`${item.category}-${item.id}-${item.title}`}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    src={item.image || item.imagen || defaultImage}
                    alt={item.title}
                    className="rounded me-3"
                    style={{ width:100, height:100, objectFit:'cover' }}
                    onError={(e) => {
                      e.target.src = defaultImage;
                    }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.title}</h5>
                    <small className="text-muted">{item.city}</small>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleUpdateQuantity(item.id, item.category, item.title, -1)}
                          disabled={item.quantity <= 1}
                        >−</button>
                        <span className="btn btn-outline-light border text-dark px-3">
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleUpdateQuantity(item.id, item.category, item.title, 1)}
                          disabled={item.quantity >= 20}
                        >+</button>
                      </div>
                      <span className="fw-medium">
                        €{(item.discountPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-link text-danger ms-3"
                    onClick={() => handleRemoveItem(item.id, item.category, item.title)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Totales y botones */}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span><span>Free</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-danger flex-fill"
                  onClick={handleEmptyCart}
                >
                  <i className="bi bi-trash me-2"></i>Vaciar Carrito
                </button>
                <button
  className="btn btn-success flex-fill"
  data-fbevent="InitiateCheckout"
  data-fbparams={JSON.stringify({
    value: subtotal,
    currency: 'EUR'
  })}
  onClick={handleProceedToPayment}
>
  Pagar Ahora
</button>
              </div>
            </div>
          </>
        )}

        {/* Modal: eliminar ítem */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar eliminación</h5>
                  <button className="btn-close" onClick={()=>setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <p>
                    ¿Eliminar {itemToRemove.quantity > 1
                      ? `los ${itemToRemove.quantity} productos`
                      : `"${itemToRemove.title}"`} del carrito?
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={()=>setShowModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={confirmRemoveItem}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: vaciar carrito */}
        {showEmptyCartModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Vaciar carrito</h5>
                  <button className="btn-close" onClick={()=>setShowEmptyCartModal(false)} />
                </div>
                <div className="modal-body">
                  <p>¿Seguro que deseas vaciar tu carrito?</p>
                  <p className="text-muted">
                    Se eliminarán {cartItems.reduce((s,i)=>s+i.quantity,0)} producto{cartItems.length!==1?'s':''}.
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={()=>setShowEmptyCartModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={confirmEmptyCart}>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastVisible && (
          <div className="position-fixed top-0 end-0 p-3" style={{zIndex:1055}}>
            <div className="toast show bg-danger text-white border-0">
              <div className="toast-body">
                {toastMessage}
                <div className="progress mt-2" style={{height:'5px'}}>
                  <div className="progress-bar bg-white" style={{width:`${toastProgress}%`}} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;