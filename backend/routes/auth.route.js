import express from 'express';
import { register, login, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verifyemail', verifyEmail);

export default router;
