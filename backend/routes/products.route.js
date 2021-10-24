import express from 'express';
const router = express.Router();
import { getAllProducts } from '../controllers/products.controller.js';

router.route('/').get(getAllProducts);

export default router;
