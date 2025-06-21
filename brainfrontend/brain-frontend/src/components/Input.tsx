
export function Input({placeHolder,reference}:{
    placeHolder:string;
    reference:any;
   
}){
    return <div>
        <input ref={reference} type={"text"} placeholder={placeHolder} className="px-4 py-2  ml-2 m-1 w-[250px] border-[2px] rounded-md "></input>
    </div>
}