import Product from '../models/product.model.js';

const test = async () => {
    const product = await Product.findByIdAndUpdate(
        {
            _id: {
                $in: ['61a513fbad08c45e335adbb3'],
            },
        },
        { $inc: { countInStock: -1 } },
        {
            new: true,
            runValidators: true,
        }
    );
    console.log(product);
};

test();
