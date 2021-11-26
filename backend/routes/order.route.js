import express from 'express';
import {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
} from '../controllers/order.controller.js';
const router = express.Router();

router.route('/').post(createOrder).get(getUserOrders).patch(updateOrder);
router.get('/all', getAllOrders);

export default router;
