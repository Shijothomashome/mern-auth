import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { errorHandler } from "./errorMiddleware.js";

// defining protect middleware
const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // Here we will get the action payload which is userId
            req.user = await User.findById(decoded.userId).select('-password'); // password will not be returned
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token!');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export { protect }
