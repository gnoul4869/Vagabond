import express from 'express';
const router = express.Router();

router.route('/').get((req, res) => {
    throw new Error('test');
    res.send('hello world');
});

export default router;
