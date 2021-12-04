import express from 'express';
import { createOrder, getAllOrders, updateOrder } from '../controllers/orders.controller.js';
const router = express.Router();

router.route('/').post(createOrder).get(getAllOrders).patch(updateOrder);

export default router;
