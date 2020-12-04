import React from 'react';
import './SubTotal.css';
import CurrencyFormat from "react-currency-format";

function SubTotal() {
    return (
        <div className="subTotal">
            <CurrencyFormat
                renderText={(value) => (
                <>
                    <p>
                    Subtotal (0 items): <strong>0</strong>
                    </p>
                    <small className="subTotal__gift">
                    <input type="checkbox" /> This order contains a gift
                    </small>
                </>
                )}
                decimalScale={2}
                value={0}
                displayType="text"
                thousandSeparator={true}
                prefix={"$"}
            />

            <button>Proceed to checkout</button>
        </div>
    )
}

export default SubTotal;
