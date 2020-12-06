import React from 'react';
import './Order.css';
import moment from "moment";
import CheckoutProduct from '../../Checkout/CheckoutProduct/CheckoutProduct';
import { useStateValue } from '../../DataLayerConfig/StateProvider';
import CurrencyFormat from "react-currency-format";

function Order({order}) {

    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className="order">
            <h2>Order</h2>
            <p>
                {moment.unix(order.data.created).format("MMMM Do YYYY h:mma")}
            </p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct 
                    id={item.id}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    title={item.title}
                    hideButton
                />
            ))}

            <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
            />
        </div>
    )
}

export default Order;
