import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LayoutHeader from '../component/LayoutHeader.jsx'

const CartPage = () => {
    const { store, actions } = useContext(Context);
    const cartItems = store.cartItems || [];
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastProgress, setToastProgress] = useState(100);

    // Carga inicial del carrito desde localStorage
    useEffect(() => {
        actions.loadCartFromLocalStorage();
    }, []);

    // Cada vez que cartItems cambie, lo guardamos de nuevo
    useEffect(() => {
        actions.saveCartToLocalStorage();
    }, [cartItems]);

    const handleUpdateQuantity = (id, change) => {
        const item = cartItems.find(item => item.id === id);
        if (!item) return;
        const newQuantity = item.quantity + change;
        if (newQuantity < 1 || newQuantity > 20) return;  // <-- Límite de 1 a 20
        actions.updateQuantity(id, newQuantity);
    };

    const handleRemoveItem = (id) => {
        const selected = cartItems.find(i => i.id === id);
        if (selected) {
            setItemToRemove(selected);
            setShowModal(true);
        }
    };

    const confirmRemoveItem = () => {
        if (!itemToRemove) return;
        actions.removeItemFromCart(itemToRemove.id);
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

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.discountPrice * item.quantity,
        0
    );

    const isLogged = () => !!localStorage.getItem("token");

    const handleProceedToPayment = () => {
        if (isLogged()) navigate('/checkout');
        else navigate('/login');
    };

    return (
        <div>
            <LayoutHeader />
            <div className="container py-5 position-relative">
                {/* Encabezado con título a la izquierda y botón a la derecha */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">My Cart</h2>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/')}
                    >
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
                        <div className="list-group mb-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="list-group-item d-flex align-items-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="rounded me-3"
                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                    />
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">{item.title}</h5>
                                        <small className="text-muted">{item.city}</small>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <div className="btn-group" role="group">
                                                <button
                                                    className={`btn btn-outline-secondary ${item.quantity <= 1 ? 'disabled' : ''}`}
                                                    onClick={() => handleUpdateQuantity(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >−</button>
                                                <span className="btn btn-outline-light border text-dark px-3">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className={`btn btn-outline-secondary ${item.quantity >= 20 ? 'disabled' : ''}`}  // <-- Deshabilitar al llegar a 20
                                                    onClick={() => handleUpdateQuantity(item.id, 1)}
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
                                        onClick={() => handleRemoveItem(item.id)}
                                        aria-label="Remove item"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))}
                        </div>

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
                            <button 
                                onClick={handleProceedToPayment} 
                                className="btn btn-danger w-100 py-2"
                            >
                                Pagar Ahora
                            </button>
                        </div>
                    </>
                )}

                {/* Modal Confirmación */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmar eliminación</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                                </div>
                                <div className="modal-body">
                                    <p>
                                        ¿Eliminar {
                                            itemToRemove.quantity > 1 
                                            ? `los ${itemToRemove.quantity} productos` 
                                            : `"${itemToRemove.title}"`
                                        } del carrito?
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={confirmRemoveItem}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast */}
                {toastVisible && (
                    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
                        <div className="toast show align-items-center text-white bg-danger border-0">
                            <div className="d-flex">
                                <div className="toast-body">{toastMessage}</div>
                                <button className="btn-close btn-close-white me-2 m-auto" onClick={() => setToastVisible(false)} />
                            </div>
                            <div style={{
                                height: '5px',
                                width: `${toastProgress}%`,
                                backgroundColor: 'white',
                                transition: 'width 0.05s linear'
                            }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;



