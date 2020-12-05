import React from 'react';
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct';
import { useStateValue } from '../DataLayerConfig/StateProvider';
import './Payment.css';
import { Link } from "react-router-dom";

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, California</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map((checkoutProduct) => (
                            <CheckoutProduct 
                                id={checkoutProduct.id}
                                image={checkoutProduct.image}
                                price={checkoutProduct.price}
                                rating={checkoutProduct.rating}
                                title={checkoutProduct.title}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe Magic */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
