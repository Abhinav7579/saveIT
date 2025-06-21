import axios from "axios";
import { BACKEND_URL } from "../config";

export async function ShareUrl(){
    const response=await axios.post(BACKEND_URL+"/api/v1/brain/share",{
        share:true
    },{
        headers:{
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    const shareurl=`http://localhost:5173/share/${response.data.hash}`;
    alert(shareurl);
}