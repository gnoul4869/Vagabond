import React from 'react';
import NumberFormat from 'react-number-format';

const ProductPrice = ({ price }) => {
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

export default ProductPrice;
