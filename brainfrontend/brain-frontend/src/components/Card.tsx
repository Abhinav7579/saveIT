
import { Shareicon } from "../icons/Share"
import { Deleteicon } from "../icons/Delete"
import { YoutubeIcon } from "../icons/youtube";
import { TwitterIcon } from "../icons/Twitter";
import { BACKEND_URL } from "../config";
import axios from "axios";
interface CardProps{
    id:string,
    title:string;
    link:string;
    type:string;
    onDelete?: () => void;
    
}
export function Card(props:CardProps){

    async function handleDelete(){
        await axios.delete(`${BACKEND_URL}/api/v1/content/${props.id}`, {
        
            headers: {
              "authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          });
          props.onDelete?.();  
        
    }
    return <div className="bg-white  rounded-md shadow-md border-[1px] border-black max-w-72 max-h-[315px] mt-[20px]">
        <div className="flex justify-between ">
            <div className="flex m-1">
            <div className="pr-2">
            {props.type === "youtube" ? <YoutubeIcon /> : <TwitterIcon />}
                </div>
                <div className="text-md ml-[-15px] text-black text-xl font-bold">
                {props.title}
                </div>
            </div>

            <div className="flex m-1 ">
                <div className="pr-2 text-grey-400">
                    <a href={props.link} target="_blank">
                <Shareicon/>
                    </a>
                </div>
                <div className="pr-2 text-grey-400" onClick={handleDelete}>
                <Deleteicon/>
                </div>
           
            </div>

            </div>
            <div className="pt-4  p-2  ">
                {props.type=="youtube" && <iframe className="w-[270px] h-[250px] rounded-2" src={props.link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
                
                {props.type=="twitter" && (<div className="w-[270px] overflow-hidden h-[250px] "> <blockquote className="twitter-tweet">
                 <a href={props.link.replace("x.com","twitter.com")}></a> 
                  </blockquote>
                  </div>)}
                  
            </div>

    </div>
}