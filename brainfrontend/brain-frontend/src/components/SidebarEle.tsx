import { ReactElement } from "react"


export function Sidebarelement({icon,text}:{
    icon:ReactElement;
    text:string;
}){
    return <div className="flex">
        <div className="cursor-pointer flex ">
        <div>
        {icon}
        </div> 

        <div>
        {text}
        </div>
        </div>
    </div>
}