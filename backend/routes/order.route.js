import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller.js';
const router = express.Router();

router.route('/').post(createOrder).get(getAllOrders);

export default router;
