import express from 'express';
const router = express.Router();
import auth from '../middlewares/auth.middleware.js';
import { createReview, getAllReviews, updateReview } from '../controllers/reviews.controller.js';

router.route('/').get(getAllReviews).post(auth, createReview).patch(auth, updateReview);

export default router;
