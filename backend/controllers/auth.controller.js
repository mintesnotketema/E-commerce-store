import { set } from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = (id) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
    return {accessToken,refreshToken};
};
const storeRefreshToken = async (userId, refreshToken) => {
    await Redis.set(`refresh_token:${userId}`, refreshToken, "EX", 60 * 60 * 24 * 7); //7days
}

const setCookie = (res, accessToken, refreshToken) => {
    res.cookie("access-token", accessToken, {
        httpOnly: true, // prevent XSS attack, cross site scripting attack
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prvide CSRF attack, cross-site request forgery attack
        maxAge: 15 * 60 * 1000, // 15 minutes
    }
    )
}
export const signup = async (req, res) => {
   const { name, email, password } = req.body;
   try {
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });

    //authenticate user 
    const {accessToken,refreshToken} = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookie(res, accessToken, refreshToken);
    
    res.status(201).json({user, message: "User created successfully"});
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};
export const login = async (req, res) => {
    res.send("Sign up route called");
};
export const logout = async (req, res) => {
    res.send("Sign up route called");
};