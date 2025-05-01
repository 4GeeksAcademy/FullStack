import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useHistory } from 'react-router-dom';

const CheckoutPage = () => {
    const { store } = useContext(Context);
    const [cartItems, setCartItems] = useState(store.cartItems || []);
    const [subtotal, setSubtotal] = useState(store.subtotal || 0);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (cartItems.length === 0) {
            history.push('/cart');
        }
    }, [cartItems, history]);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const backendUrl = process.env.BACKEND_URL 
            const response = await fetch(`${backendUrl}/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems,
                    total: subtotal,
                }),
            });

            const data = await response.json();
            if (data.sessionId) {
                const stripe = window.Stripe('pk_test_51RHkEqFNyrX4spGdBv11uJQXp9SbJRaSxzsolRbEeZVVYuzxZqtdF4uBytcTV0BkfQRgMemgaA2DnGI4lriZZpWb00g736yfzD');
                await stripe.redirectToCheckout({ sessionId: data.sessionId });
            }
        } catch (error) {
            console.error('Error in checkout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Checkout</h2>
            {cartItems.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted mb-3">Your Cart is Empty</p>
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
                                        <span className="fw-medium">€{(item.discountPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
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
                        <button onClick={handleCheckout} className="btn btn-danger w-100" disabled={loading}>
                            {loading ? 'Processing...' : 'Proceed to Stripe Payment'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;



