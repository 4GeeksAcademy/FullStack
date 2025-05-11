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
    const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastProgress, setToastProgress] = useState(100);

    useEffect(() => {
        actions.loadCartFromLocalStorage();
    }, []);

    const handleUpdateQuantity = (id, title, category, change) => {
        const item = cartItems.find(item =>
            item.id === id &&
            item.title === title &&
            item.category === category
        );

        if (!item) return;

        const newQuantity = item.quantity + change;
        if (newQuantity < 1 || newQuantity > 99) return;

        setToastMessage("Actualizando cantidad...");
        setToastVisible(true);

        const success = actions.updateQuantity(id, title, category, newQuantity);

        if (success) {
            setToastMessage("Cantidad actualizada");
            setTimeout(() => setToastVisible(false), 1000);
        } else {
            setToastMessage("Error al actualizar");
            setTimeout(() => setToastVisible(false), 2000);
        }
    };

    const handleRemoveItem = (id, title, category) => {
        const selectedItem = cartItems.find(item =>
            String(item.id) === String(id) &&
            item.title === title &&
            item.category === category
        );

        if (selectedItem) {
            setItemToRemove(selectedItem);
            setShowModal(true);
        }
    };

    const handleEmptyCart = () => {
        setShowEmptyCartModal(true);
    };

    const confirmEmptyCart = () => {
        setShowEmptyCartModal(false);
        const success = actions.emptyCart();

        if (success) {
            setToastMessage("Carrito vaciado");
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
        }
    };

    const confirmRemoveItem = async () => {
        if (!itemToRemove) return;

        setShowModal(false);

        const success = await actions.removeItemFromCart(
            itemToRemove.id,
            itemToRemove.title,
            itemToRemove.category
        );

        if (success) {
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

        setItemToRemove(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setItemToRemove(null);
    };

    const closeEmptyCartModal = () => {
        setShowEmptyCartModal(false);
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
            user_id: item.user_id,
            category: item.category
        }));

        if (checkLoginStatus()) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="container py-5 position-relative">
            {/* Botón Volver al inicio - AÑADIDO */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Mi Carrito</h2>
                <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => navigate('/')}
                >
                    <i className="bi bi-house-door me-2"></i>Volver al inicio
                </button>
            </div>

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
                        {cartItems.map((item, index) => (
                            <div key={`${item.id}-${item.title}-${index}`} className="list-group-item d-flex align-items-center">
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
                                                onClick={() => handleUpdateQuantity(item.id, item.title, item.category, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="btn btn-outline-light border text-dark px-3">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => handleUpdateQuantity(item.id, item.title, item.category, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="fw-medium">€{(item.discountPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-link text-danger ms-3"
                                    onClick={() => handleRemoveItem(item.id, item.title, item.category)}
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
                        <div className="d-flex justify-content-between gap-2">
                            <button 
                                onClick={handleEmptyCart} 
                                className="btn btn-outline-danger w-50 py-2"
                            >
                                <i className="bi bi-trash me-2"></i>Vaciar Carrito
                            </button>
                            <button onClick={handleProceedToPayment} className="btn btn-success w-50 py-2">
                                Pagar Ahora
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Modal de confirmación para vaciar carrito */}
            {showEmptyCartModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Vaciar carrito</h5>
                                <button type="button" className="btn-close" onClick={closeEmptyCartModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro que deseas vaciar completamente tu carrito?</p>
                                <p className="text-muted">Se eliminarán {totalItems} producto{totalItems !== 1 ? 's' : ''}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeEmptyCartModal}>
                                    Cancelar
                                </button>
                                <button className="btn btn-danger" onClick={confirmEmptyCart}>
                                    <i className="bi bi-trash me-2"></i>Vaciar Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmación para eliminar item */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar eliminación</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
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
                                <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
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