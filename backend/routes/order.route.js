import express from 'express';
import { createOrder, getAllOrders, getUserOrders } from '../controllers/order.controller.js';
const router = express.Router();

router.route('/').post(createOrder).get(getUserOrders);
router.get('/all', getAllOrders);

export default router;
