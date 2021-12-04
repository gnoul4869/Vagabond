import express from 'express';
const router = express.Router();
import auth from '../middlewares/auth.middleware.js';
import { createReview, getAllReviews } from '../controllers/reviews.controller.js';

router.get('/', getAllReviews);
router.post('/', auth, createReview);

export default router;
