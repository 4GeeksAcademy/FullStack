import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import LayoutHeader from "../component/LayoutHeader.jsx";
import "../../styles/product.css"


export const Product = () => {
    const { store } = useContext(Context);
    const producto = store.productDetails;

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        
    }, [])

    return (
        <div>
        <LayoutHeader />
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4 d-flex flex-column flex-md-row">
                    <div className="left-container w-md-50">
                        <img className="product-image" src={producto.image}></img>
                    </div>
                    <div className="right-container d-flex flex-sm-column flex-md-column flex-column p-4 w-md-50">
                    <h1 className="title-product mb-1 fw-bold">{producto.title}</h1>
                    <h6 className="mb-2 fw-bold text-muted">{producto.city}</h6>
                    
                    <div className="price-section mb-4">
                        <span className="text-muted text-decoration-line-through fs-5 me-2">{producto.originalPrice}</span>
                        <span className="current-price fw-bold fs-3 text-danger">{producto.discountPrice}</span>
                        <span className="badge bg-success ms-2">{Math.round((100 * producto.discountPrice) / producto.originalPrice)}% OFF</span>
                    </div>

                    <div className="quantity-selector mb-4">
                        <label htmlFor="quantity" className="form-label fw-semibold small text-uppercase text-muted mb-2">Cantidad</label>
                        <div className="d-flex align-items-center">
                            <button 
                                className="btn btn-outline-secondary border-2 px-3 py-1 fs-5" 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                −
                            </button>
                            <input 
                                type="number" 
                                id="quantity"
                                min="1"
                                max="10"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="form-control text-center border-2 border-start-0 border-end-0 rounded-0 mx-0 px-2 py-2 fs-5 fw-bold"
                                style={{width: "60px"}}
                            />
                            <button 
                                className="btn btn-outline-secondary border-2 px-3 py-1 fs-5" 
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3 mt-auto">
                        <button className="btn btn-dark text-white fw-bold py-3 rounded-3 shadow-sm">
                            <i className="bi bi-cart-plus me-2"></i> AGREGAR AL CARRITO
                        </button>
                        
                        <div className="d-flex align-items-center gap-2 my-2">
                            <hr className="flex-grow-1 border-secondary" />
                            <span className="text-muted small">O</span>
                            <hr className="flex-grow-1 border-secondary" />
                        </div>
                        
                        <button className="btn btn-danger text-white fw-bold py-3 rounded-3 shadow-sm">
                            COMPRAR AHORA
                        </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-10 col-md-9 col-lg-8 mx-auto px-0 px-sm-4 py-4">
                <h3 className="text-uppercase fw-bold fs-5 mb-3">DESCRIPCION DEL SERVICIO</h3>
    
                    <div>
                        <span className="fs-5 text-dark py-2">
                            {producto.description}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}