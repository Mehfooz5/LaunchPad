import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/token.js';
 
export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "Please provide all credentials" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        generateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            message: "User created successfully"
        });

    } catch (error) {
        console.log("error in signUp controller")
        return res.status(500).json({ error: error.message, message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(402).json({ message: "Invalid credentials" });

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if(!isPassCorrect) return res.status(402).json({ message: "Invalid credentials" });

        generateToken(user._id, res)

        return res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            message: "User Logged In"
        });

    } catch (error) {
        console.log("error in login controller")
        return res.status(500).json({ error: error.message, message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        return res.status(201).json({message: "user Logged Out"});
    } catch (error) {
        console.log("error in logout controller")
        return res.status(500).json({ error: error.message, message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log('error in checkout controller');
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
