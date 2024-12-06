
import express from 'express';
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import { createHouse,getHouses,getHouseById,deleteHouse } from '../controllers/houseController.js';
import upload from '../middlewares/uploadMiddleware.js';
import { purchaseHouse } from '../controllers/houseController.js';
import { validatePurchase } from '../middlewares/validatePurchase.js';
const router = express.Router();

router.post('/add',authenticate,isAdmin, upload.array('images', 10), createHouse);

router.get('/list', getHouses);                    // Get list of houses
router.get('/:id', getHouseById);                  // Get house by ID
router.delete('/:id', isAdmin, deleteHouse);  

router.post('/purchase',authenticate, validatePurchase, purchaseHouse);

export default router;
