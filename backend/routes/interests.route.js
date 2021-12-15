import express from 'express';
import { getUserInterests, addInterest } from '../controllers/interests.controller.js';
const router = express.Router();

router.route('/').get(getUserInterests).post(addInterest);

export default router;
