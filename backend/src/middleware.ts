import jwt from "jsonwebtoken";
import express,{ Request, Response, NextFunction } from "express";
import { JWT_PASS } from "./config";

// Extend the Request type to include the `id` property
declare global {
  namespace Express {
    interface Request {
      id?: string; // Add custom `id` property
    }
  }
}

export const middleWare = (req:Request, res:Response, next:NextFunction):void=> {
    const header = req.headers["authorization"];

    if (!header) {
         res.status(401).json({
            message: "Authorization token is missing"
        });
        return;
    }

    const token = header.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Authorization token format is incorrect"
        });
        return;
    }

    try {
        const decoded: any =jwt.verify(token, JWT_PASS); 
        req.id = decoded.id; 
        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid or expired token"
        });
        return;
    }
};
