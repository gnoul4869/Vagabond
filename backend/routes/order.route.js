import express from 'express';
import { createOrder, getOrders, updateOrder } from '../controllers/order.controller.js';
const router = express.Router();

router.route('/').post(createOrder).get(getOrders).patch(updateOrder);

export default router;
