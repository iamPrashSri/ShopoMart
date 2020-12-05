import React from 'react';
import { useStateValue } from '../DataLayerConfig/StateProvider';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct/CheckoutProduct';
import SubTotal from './SubTotal/SubTotal';
import { FlipMove } from "react-flip-move";

function Checkout() {

    // Again basket from state
    let [ {basket, user}, dispatch ] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
                    alt="" 
                    className="checkout__ad"/>
                
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">
                        Your Shopping Basket
                    </h2>
                </div>

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
            <div className="checkout__right">
                <SubTotal />
            </div>
        </div>
    )
}

export default Checkout;
