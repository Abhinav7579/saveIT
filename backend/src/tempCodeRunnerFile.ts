import express from "express"
import jwt from "jsonwebtoken";
import { userModel,contentModel } from "./db";
import z from "zod";
const app=express();
app.use(express.json()); 
import { middleWare } from "./middleware";
import bcrypt from "bcrypt"
import {JWT_PASS} from "./config"
app.post("/api/v1/signup",async (req,res)=>{
    const requiredbody = z.object({
        username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be at most 10 characters" }),
        password: z.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
    });

    const safeparse=requiredbody.safeParse(req.body);
    if(!safeparse.success){
        res.status(400).json({
            message:"error in input"
        })
        return;
    }

    const username=req.body.username;
    const password=req.body.password;
    
    const hashpassword=await bcrypt.hash(password,5);
    try{
    await userModel.create({
        username:username,
        password:hashpassword
    })
    res.status(200).json({
        message:"you are successfully signed up"
    })
    }
    catch(e){
        res.status(411).json({
            message:"user already exist"
        })
    }
})