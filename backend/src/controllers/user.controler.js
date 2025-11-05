import { genrateToken } from "../config/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { verifyCaptcha } from "../config/verifyCaptcha.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All field must be filled" })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be atleast of 6 letters"
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "Email Already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        })

        if (newUser) {
            await newUser.save();
            
            // Generate token and send in response
            const token = genrateToken(newUser._id);

            res.status(201).json({
                token,
                user: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                }
            })
        } else {
            res.status(400).json({ message: "Invalid User Data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password, captchaToken } = req.body
    
    try {
        if (process.env.NODE_ENV !== 'test') {
            const isHuman = await verifyCaptcha(captchaToken);
            if (!isHuman) {
                return res.status(403).json({ message: "Captcha verification failed" });
            }
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // Generate token and send in response
        const token = genrateToken(user._id);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        // No need to clear cookie anymore, just send success
        return res.status(200).json({
            message: "Logout Successfully"
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in Auth check controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }
        res.json({ user: req.user })
    } catch (error) {
        res.status(500).json({
            error: "Server error"
        })
    }
}