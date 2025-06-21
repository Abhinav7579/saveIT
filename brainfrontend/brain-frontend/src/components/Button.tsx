import { ReactElement } from "react";

interface Buttonprops{
    variant:"primary" | "secondary";
    size:"sm"|"md"|"lg";
    text:String;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick?:()=>void;
}

const variantstyles={
    "primary":"bg-blue-700 text-white",
    "secondary":"bg-blue-700 text-white text-xl font-2" 
}
const defaultstyles="rounded-md  m-1 flex hover:bg-blue-500 hover:shadow-lg "
 const sizestyles={
    "sm": "p-1",
    "md": "p-2 ",
    "lg": "pl-[90px] pt-[2px] h-[35px] w-[245px] "
}
 
export const Button=(props:Buttonprops)=>{

    return (
    <button onClick={props.onClick} className={`${variantstyles[props.variant]} ${defaultstyles} ${sizestyles[props.size]}`} >{props.startIcon ?<div className="pr-2">{props.startIcon}</div>:null} {props.text} </button>
    )

}
