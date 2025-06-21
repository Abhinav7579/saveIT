import { useRef } from "react";
import { CrossIcon } from "../icons/Cross"
import { Button } from "./Button"
import { Input } from "./Input";
import axios from "axios";
import { BrainIcon } from "../icons/Brain";
import { BACKEND_URL } from "../config";
export function CreateContentModal({open,onClose}:{
    open:any;
    onClose:()=>void;
}){
    
    const titleRef=useRef<HTMLInputElement>();
    const typeRef=useRef<HTMLInputElement>();
    const linkRef=useRef<HTMLInputElement>();

    async function addContent(){
        const title=titleRef.current?.value;
        const type=typeRef.current?.value;
        const link=linkRef.current?.value;

        await axios.post(BACKEND_URL +"/api/v1/content",{
            title,
            type,
            link
        },{
            headers:{
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        onClose();


    }
    return <div>
       {open && <div className="w-screen h-screen bg-black fixed top-0 left-0 bg-opacity-85 flex justify-center"> 
        <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 w-[300px] h-[400px] mt-[190px] rounded-md bg-opacity-100">
            <div className="flex justify-end m-2">
                <div onClick={onClose} className="cursor-pointer">
                <CrossIcon/>
                </div>
            </div>
            <div className="font-bold text-3xl m-3 flex justify-center">
                <BrainIcon/>
                </div>
            <div className="pl-[17px]">
            <Input reference={titleRef} placeHolder={"title"}/>
            <Input reference={typeRef} placeHolder={"type(youtube,twitter)"}/>
            <Input reference={linkRef} placeHolder={"link"}/>
            </div>
            <div className="flex justify-center m-2 ">
            <Button variant="primary" size="lg" text={"saveit"} onClick={addContent}/>
                </div>
            
            </div>
       
         </div> }
    </div>

}

