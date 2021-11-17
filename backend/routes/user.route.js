import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/user.controller.js';
const router = express.Router();

router.route('/').get(getUserDetails).patch(updateUserDetails);

export default router;
