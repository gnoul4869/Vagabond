import React from 'react';
import NumberFormat from 'react-number-format';

const PriceFormat = ({ price }) => {
    return (
        <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'₫'}
        ></NumberFormat>
    );
};

export default PriceFormat;
