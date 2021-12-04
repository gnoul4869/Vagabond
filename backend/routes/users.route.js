import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/users.controller.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1 * 1024 * 1024,
    },
});
const router = express.Router();

router.route('/').get(getUserDetails).patch(upload.single('imageFile'), updateUserDetails);

export default router;
