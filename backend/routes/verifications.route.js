import express from 'express';
import { confirmEmail, verifyEmail } from '../controllers/verification.controller.js';
const router = express.Router();

router.post('/verifyemail', verifyEmail);
router.post('/confirmemail', confirmEmail);

export default router;
