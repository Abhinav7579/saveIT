import { Request, Response, NextFunction } from "express";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel,contentModel,linkmodel } from "./db";
import z from "zod";
import { random } from "./util";
import { middleWare } from "./middleware";
import bcrypt from "bcrypt"
import {JWT_PASS} from "./config"
const app=express();
import cors from "cors"
app.use(express.json()); 
app.use(cors());

app.post("/api/v1/signup",async (req,res)=>{
    const requiredbody = z.object({
        username: z.string().email(),
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

app.post("/api/v1/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, JWT_PASS);
        res.json({ token:token });
    } else {

        res.status(403).json({ message: "Incorrect credentials" });
    }
});

 app.post("/api/v1/content",middleWare,async (req:Request,res:Response):Promise<void>=>{
    const title=req.body.title;
    const type=req.body.type;
    const link=req.body.link;
    try{
    await contentModel.create({
        title:title,
        type:type,
        link:link,
        tags:[],
        userId:req.id
    })
     res.json({
        mesasge:"content added"
    })
}
catch(e){
    res.status(500).json({
        message: "Error adding content",
      })
}
})

app.get("/api/v1/content", middleWare, async (req: Request, res: Response): Promise<void> => {
    const Contentid = req.id;
    if (!Contentid) {
        res.status(400).json({ message: "User ID not found in request" });
        return;
    }
    try {
        const FindContent = await contentModel.find({ userId: Contentid }).populate("userId");
        if (FindContent.length > 0) {
            res.json({ FindContent });
        } else {
            res.status(404).json({ message: "Content not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete("/api/v1/content/:id", middleWare, async (req: Request, res: Response) => {
    const contentId = req.params.id;
    const userId = req.id; 

    const content = await contentModel.findOne({
        _id: contentId,
        userId: userId, 
    });

    if (!content) {
         res.status(404).json({ message: "Content not found or unauthorized" });
         return;
    }

    await contentModel.deleteOne({ _id: contentId });

    res.json({
        message: "Successfully deleted",
    });
});


 app.post("/api/v1/brain/share",middleWare,async (req:Request,res:Response)=>{
    const share=req.body.share;
    if(share){
        const existingLink=await linkmodel.findOne({
            userId:req.id
        });
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return;
        }
        const hash=random(10);
        await linkmodel.create({
            userId: req.id,
            hash:hash
        })
        res.json({
            hash
        })
    }
    else{
        await linkmodel.deleteOne({
            userId:req.id
        })
    }

})
app.get("/api/v1/brain/:sharedlink",async (req,res)=>{
    const hash =req.params.sharedlink;

    const link=await linkmodel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            message:"sorry not able to find"
        })
        return ;
    }
    const content=await contentModel.find({
        userId:link.userId
    })

    const user=await userModel.findById({
        _id:link.userId
    })
res.json({
    username:user?.username,
    content:content
})

})

app. listen(3000,()=>{
    console.log('Server is running on port 3000');
  });