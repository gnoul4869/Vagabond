import express from 'express';
const router = express.Router();
import {
    getAllProducts,
    getProductCategories,
    getRecommendedProducts,
    getSingleProduct,
} from '../controllers/products.controller.js';

router.route('/recommend').get(getRecommendedProducts);
router.route('/categories').get(getProductCategories);
router.route('/').get(getAllProducts);
router.route('/:id').get(getSingleProduct);

export default router;
