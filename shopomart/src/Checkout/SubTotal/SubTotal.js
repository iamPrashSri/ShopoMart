import React from 'react';
import './SubTotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from '../../DataLayerConfig/StateProvider';
import { getBasketTotal } from '../../DataLayerConfig/Reducer';

function SubTotal() {

    // Again basket from state
    let [ {basket}, dispatch ] = useStateValue();

    return (
        <div className="subTotal">
            <CurrencyFormat
                renderText={(value) => (
                <>
                    <p>
                    Subtotal ({basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className="subTotal__gift">
                    <input type="checkbox" /> This order contains a gift
                    </small>
                </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType="text"
                thousandSeparator={true}
                prefix={"$"}
            />

            <button>Proceed to checkout</button>
        </div>
    )
}

export default SubTotal;
