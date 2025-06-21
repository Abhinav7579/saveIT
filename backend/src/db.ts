import mongoose, { Model, model,Schema } from "mongoose";
import { NewLineKind } from "typescript";
mongoose.connect("mongodb+srv://abhinavsyunary:b2eBvzWBl9lRfhGB@cluster0.payrt.mongodb.net/brain");

const userSchema=new Schema({
    username:{type:String,unique:true},
    password:String
})

const contentSchema=new Schema({
    title:String,
    type:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:[{type:mongoose.Types.ObjectId,ref:'user',required:true}]
})

const linkSchema=new Schema({
    hash:String,
    userId:[{type:mongoose.Types.ObjectId,ref:'user',required:true,unique:true}]
})


export const linkmodel=model("links",linkSchema);
 export const userModel=model("user",userSchema);
 export const contentModel=model("content",contentSchema);





