import express from 'express';
import { signUp } from '../controllers/authController.js';

const router = express.Router();

router.get('/signUp', signUp);

export default router;

