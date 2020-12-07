import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useStateValue } from '../DataLayerConfig/StateProvider';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct/CheckoutProduct';
import SubTotal from './SubTotal/SubTotal';

function Checkout() {

    // Again basket from state
    let [ {basket, user}, dispatch ] = useStateValue();
    const history = useHistory();
    const MySwal = withReactContent(Swal);
    
    useEffect(() => {
        if( !user ){
            MySwal.fire({
                title: <h6>Please Sign In/Sign Up to see your cart</h6>,
                icon: "error",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then(() => {
                history.replace('/login');
            });
        }
    }, [user]);

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
                    alt="" 
                    className="checkout__ad"/>
                
                <div>
                    <h3>Hello, {user ? user.email : 'Guest'}</h3>
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
