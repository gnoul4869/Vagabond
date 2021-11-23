import React, { useRef, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const NumberInput = ({ qty, max, setQty, productID, disabled }) => {
    const dispatch = useDispatch();
    const refInput = useRef(null);
    const [error, setError] = useState('');

    const inputHandler = (value) => {
        value = parseInt(value);
        if (value > max) {
            return setError('Sản phẩm đã đạt số lượng tối đa');
        }
        if (value >= 1) {
            if (setQty) {
                setQty(value);
            }
            if (productID) {
                dispatch(addToCart(productID, value));
            }
            refInput.current.value = value;
        }
        setError('');
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

            {error && <div className="number-input-error text-danger">{error}</div>}
        </div>
    );
};

export default NumberInput;
