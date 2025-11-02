import express from 'express';
import { login, signup, logout, checkAuth, getMe } from '../controllers/user.controler.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import passport from "passport";
import { genrateToken } from '../config/utils.js'; // ADD THIS IMPORT

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/check", protectRoute, checkAuth);

// Route to initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    try {
      console.log("req.user:", req.user);

      
      const user = req.user.user || req.user;

      
      genrateToken(user._id, res);

      // Send response with user data
      res.status(200).json({
        success: true,
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        googleId: user.googleId
      });
    } catch (error) {
      console.error("Callback error:", error);
      res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: error.message
      });
    }
  }
);

router.get("/me", protectRoute, getMe);

export default router;