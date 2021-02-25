import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderbyId } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderbyId);

export default router;
