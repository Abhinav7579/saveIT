import { BrainIcon } from "../icons/Brain"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
export function Signup(){
    const usernamRef=useRef<HTMLInputElement>();
    const passwordRef=useRef<HTMLInputElement>();
    const navigate=useNavigate();

    async function Signup() {
    const username = usernamRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });

      alert(response.data.message);
      navigate("/signin");
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  }
    return (
        <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" >
            <div className="flex justify-center  text-black w-[500px] ml-[500px] pt-[30px]">
                <BrainIcon/>
                </div>
            
            
            <div className="flex justify-center mt-20">
            <div className="w-[350px] h-[400px] bg-blue-100 rounded-lg shadow-lg ">
                <div className="text-3xl font-bold flex justify-center pt-7">
                    SIGNUP
                </div>
               
               <div className="mt-10 ml-11">
               <Input reference={usernamRef} placeHolder="username"/>
               <Input reference={passwordRef} placeHolder="password"/>
               </div>

                <div className="flex justify-center mt-6 ">
                    <Button variant="secondary" size="lg" text={"submit"} onClick={Signup}/>

                </div>
                 <div className="flex justify-center mt-[20px]">
                 Already have an account?
            </div>
            <div className="flex justify-center mt-[2px] font-extrabold">
                <span className="cursor-pointer" onClick={()=>{navigate("/signin")}}>Signin</span>
            </div>


            </div>
            </div>
        </div>
    )

}