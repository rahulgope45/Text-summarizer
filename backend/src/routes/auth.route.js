import express from 'express';
import { login,signup,logout,checkAuth } from '../controllers/user.controler.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/check",protectRoute, checkAuth);

export default router;