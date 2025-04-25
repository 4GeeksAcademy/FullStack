import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
    const { store, actions } = useContext(Context);
    const [cartItems, setCartItems] = useState(store.cartItems || []);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        actions.updateCart(updatedItems);
    };

    const removeItem = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        actions.updateCart(updatedItems);
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + (item.discountPrice * item.quantity),
        0
    );

    return (
        <div className="container py-5">
            <h2 className="mb-4">My Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted mb-3">Your Cart is Empty</p>
                    <Link to="/" className="btn btn-danger">
                        Browse Offers
                    </Link>
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
                                                className="btn btn-outline-secondary"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="btn btn-outline-light border">{item.quantity}</span>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="fw-medium">€{(item.discountPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-link text-danger ms-3"
                                    onClick={() => removeItem(item.id)}
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
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                            <span>Total</span>
                            <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="btn btn-danger w-100">
                            Proceed to Payment
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;