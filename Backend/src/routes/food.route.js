import express from 'express';  
import { authFoodPartner } from '../middlewares/auth.middleware.js';

const router = express.Router();   

// protected 
router.post('/',authFoodPartner);

export default router;