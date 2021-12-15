import express from 'express';
import { createInterest } from '../controllers/interests.controller';
const router = express.Router();

router.route('/').post(createInterest);

export default router;
