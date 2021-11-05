import React, { useRef } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const NumberInput = ({ qty, max, setQty, productID, disabled }) => {
    const dispatch = useDispatch();
    const refInput = useRef(null);
    console.log(disabled);

    const inputHandler = (value) => {
        if (value >= 1) {
            if (value > max) {
                value = max;
            }
            if (setQty) {
                setQty(value);
            }
            if (productID) {
                dispatch(addToCart(productID, value));
            }
            refInput.current.value = value;
        }
    };

    return (
        <div className="input-group number-input-group">
            <button
                type="button"
                className="border py-1 px-2 bg-white"
                onClick={() => inputHandler(qty - 1)}
                disabled={disabled}
            >
                <BiMinus className="icon" />
            </button>

            <input
                type="number"
                className="form-control number-input-form text-center"
                value={max > 0 ? qty : 0}
                min="1"
                max={max}
                onChange={(e) => inputHandler(e.target.value)}
                onWheel={(e) => e.target.blur()}
                ref={refInput}
                disabled={disabled}
            />

            <button
                type="button"
                className="border py-1 px-2 bg-white"
                onClick={() => inputHandler(qty + 1)}
                disabled={disabled}
            >
                <BiPlus className="icon" />
            </button>
        </div>
    );
};

export default NumberInput;
