import { BrainIcon } from "../icons/Brain"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
 import { useNavigate } from "react-router-dom";
export function Signin(){
    const usernamRef=useRef<HTMLInputElement>();
    const passwordRef=useRef<HTMLInputElement>();
    const navigate=useNavigate();

    async function signin() {
    const username = usernamRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      alert("You have signed in");
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Signin failed");
    }
  }

    return (
        <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" >
        <div className="flex justify-center  text-black w-[500px] ml-[500px] pt-[30px]">
            <BrainIcon/>
            </div>
        
        
        <div className="flex justify-center mt-20 ">
        <div className="w-[350px] h-[400px] bg-blue-100 border-2 rounded-lg shadow-lg ">
            <div className="text-3xl font-extrabold flex justify-center pt-7">
                SIGNIN
            </div>
           
           <div className="mt-10 ml-11">
           <Input reference={usernamRef} placeHolder="username"/>
           <Input reference={passwordRef} placeHolder="password"/>
           </div>

            <div className="flex justify-center mt-6 ">
                <Button variant="secondary" size="lg" text={"submit"} onClick={signin}/>
            </div>
            <div className="flex justify-center mt-[20px]">
                Don't have an account?
            </div>
            <div className="flex justify-center mt-[2px] font-extrabold">
                <span className="cursor-pointer" onClick={()=>{navigate("/signup")}}>Signup</span>
            </div>


        </div>
        </div>
    </div>
    )

}