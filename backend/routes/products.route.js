import express from 'express';
const router = express.Router();
import {
    getAllProducts,
    getProductCategories,
    getSingleProduct,
} from '../controllers/products.controller.js';

router.route('/categories').get(getProductCategories);
router.route('/').get(getAllProducts);
router.route('/:id').get(getSingleProduct);

export default router;
