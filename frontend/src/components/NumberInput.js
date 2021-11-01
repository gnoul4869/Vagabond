import React, { useRef } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

const NumberInput = ({ qty, max, setQty }) => {
    const refInput = useRef(null);

    const inputHandler = (value) => {
        if (value < 1) {
            value = 1;
        }
        if (value > max) {
            value = max;
        }
        setQty(value);
        refInput.current.value = value;
    };

    return (
        <div className="input-group number-input-group">
            <button
                type="button"
                className="border py-1 px-2 bg-white"
                onClick={() => inputHandler(qty - 1)}
            >
                <BiMinus className="btn-icon" />
            </button>

            <input
                type="number"
                value={max > 0 ? qty : 0}
                min="1"
                max={max}
                onChange={(e) => inputHandler(e.target.value)}
                onWheel={(e) => e.target.blur()}
                ref={refInput}
                className="form-control number-input-form text-center"
            />

            <button
                type="button"
                className="border py-1 px-2 bg-white"
                onClick={() => inputHandler(qty + 1)}
            >
                <BiPlus className="btn-icon" />
            </button>
        </div>
    );
};

export default NumberInput;
