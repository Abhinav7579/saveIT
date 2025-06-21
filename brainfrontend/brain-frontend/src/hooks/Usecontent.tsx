import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";
export interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
}
export  function Usecontent():[Content[],()=>void]{
    const[contents,setContents]=useState<Content[]>([])
    function refresh(){
      axios.get(BACKEND_URL + "/api/v1/content",{
        headers:{
            "authorization": `Bearer ${localStorage.getItem("token")}`
        } 
       })
      .then((response)=>{
           console.log(response.data.FindContent);
        setContents(response.data.FindContent);
      })

    }
    useEffect(()=>{
      refresh();
      let interval=setInterval(()=>{
        refresh()
      },1000)
      return()=>{
        clearInterval(interval);
      }  
    },[])


    return [contents,refresh];
}