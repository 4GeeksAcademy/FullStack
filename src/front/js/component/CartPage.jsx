import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CartPage = () => {
    const { store, actions } = useContext(Context);
    const cartItems = store.cartItems || [];
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastProgress, setToastProgress] = useState(100);

    useEffect(() => {
        actions.loadCartFromLocalStorage();
    }, []);

    const handleUpdateQuantity = (id, change) => {
        const item = cartItems.find(item => item.id === id);
        if (!item) return;

        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return;

        setToastMessage("Actualizando cantidad...");
        setToastVisible(true);

        const success = actions.updateQuantity(id, newQuantity);

        if (success) {
            setToastMessage("Cantidad actualizada");
            setTimeout(() => setToastVisible(false), 1000);
        } else {
            setToastMessage("Error al actualizar");
            setTimeout(() => setToastVisible(false), 2000);
        }
    };

    const handleRemoveItem = (id) => {
        const selectedItem = cartItems.find(item => item.id === id);
        if (selectedItem) {
            setItemToRemove(selectedItem);
            setShowModal(true);
        }
    };

    const confirmRemoveItem = () => {
        if (!itemToRemove) return;

        const success = actions.removeItemFromCart(itemToRemove.id);
        if (success) {
            setShowModal(false);
            setToastMessage(`Producto eliminado: ${itemToRemove.title}`);
            setToastVisible(true);
            setToastProgress(100);

            let progress = 100;
            const interval = setInterval(() => {
                progress -= 2;
                setToastProgress(progress);
                if (progress <= 0) {
                    clearInterval(interval);
                    setToastVisible(false);
                }
            }, 50);
        } else {
            setToastMessage("Error al eliminar el producto");
            setToastVisible(true);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);

    const checkLoginStatus = () => !!localStorage.getItem("token");

    const handleProceedToPayment = () => {
        const cartWithImages = cartItems.map(item => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.discountPrice,
            image: item.image,
            user_id: item.user_id
        }));

        console.log("Carrito con imágenes:", cartWithImages);

        if (checkLoginStatus()) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="container py-5 position-relative">
            <h2 className="mb-4">Mi Carrito</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted mb-3">Tu carrito está vacío</p>
                    <button className="btn btn-danger" onClick={() => navigate('/')}>
                        Ver Ofertas
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
                                        <div className="btn-group">
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="btn btn-outline-light border text-dark px-3">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="fw-medium">€{(item.discountPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-link text-danger ms-3"
                                    onClick={() => handleRemoveItem(item.id)}
                                    aria-label="Eliminar"
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
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                            <span>Total</span>
                            <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        <button onClick={handleProceedToPayment} className="btn btn-danger w-100 py-2">
                            Pagar Ahora
                        </button>
                    </div>
                </>
            )}

            {/* Modal de confirmación */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar eliminación</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    ¿Eliminar {
                                        itemToRemove?.quantity > 1
                                            ? `${itemToRemove.quantity} unidades`
                                            : `"${itemToRemove?.title}"`
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
                    <div className="toast show bg-dark text-white">
                        <div className="toast-body">
                            {toastMessage}
                            <div className="progress mt-2" style={{ height: '4px' }}>
                                <div className="progress-bar bg-danger" style={{ width: `${toastProgress}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
