import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/user.controller.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.route('/').get(getUserDetails).patch(upload.single('imageFile'), updateUserDetails);

export default router;
