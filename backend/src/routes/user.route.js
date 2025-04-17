import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { createFounderProfile, getMyFounderProfile, updateFounderProfile } from '../controllers/founder.controller.js';
import { createInvestorProfile, getMyInvestorProfile, updateInvestorProfile } from '../controllers/investor.controller.js';
import { createStartupProfile } from '../controllers/startup.controller.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();

router.post('/createFounderProfile', verifyToken, createFounderProfile);
router.get('/getMyFounderProfile', verifyToken, getMyFounderProfile);
router.put('/updateFounderProfile', verifyToken, updateFounderProfile);

router.post('/createInvestorProfile', verifyToken, createInvestorProfile);
router.get('/getMyInvestorProfile', verifyToken, getMyInvestorProfile);
router.put('/updateInvestorProfile', verifyToken, updateInvestorProfile);

// routes/startupRoutes.js

// Route to create a startup profile with file uploads

// For multiple named files (1 pdf and 1 pitch)
router.post('/startup', upload.fields([
  { name: 'startupPdf', maxCount: 1 },
  { name: 'pitch', maxCount: 1 }
]),verifyToken, createStartupProfile);

export default router;