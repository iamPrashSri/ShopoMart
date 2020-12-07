import React, { useEffect, useState } from 'react';
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct';
import { useStateValue } from '../DataLayerConfig/StateProvider';
import './Payment.css';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../DataLayerConfig/Reducer';
import Axios from '../DataLayerConfig/Axios';
import { db } from '../Hosting/Firebase';

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    let [error, setError] = useState(null);
    let [disabled, setDisabled] = useState(true);
    let [succeeded, setSucceeded] = useState(false);
    let [processing, setProcessing] = useState("");
    let [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // Generate the special stripe secret which allows us to charge customer
        let getClientSecret = async () => {
            let response = await Axios({
                method: 'post',
                // Stripe accepts the total in the currencies subunits (1$ = 100Cents)
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        };

        getClientSecret();
    }, [basket]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        let payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // Payment intent is basically payment confirmation
            
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });

            history.replace('/orders');    /* Throw user to Orders Page */
            /* Used replace instead of push so that customer does not come back to this */
            /* page after payment is done */
        });
    };
    const handleChange = event => {
        // Listen for changes in Card element
        // And display any errors as the customer types the card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

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
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => <h3>Order Total: {value}</h3>}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType="text"
                                    thousandSeparator={true}
                                    prefix="$"
                                />
                                <button
                                    disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : <p>Buy Now</p>}
                                    </span>
                                </button>
                            </div>

                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
