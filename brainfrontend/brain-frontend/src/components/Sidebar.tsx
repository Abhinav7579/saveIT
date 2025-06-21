import { Sidebarelement } from "./SidebarEle"
import { YoutubeIcon } from "../icons/youtube"
import { TwitterIcon } from "../icons/Twitter"
import { BrainIcon } from "../icons/Brain"

export function Sidebar(){
    return <div className="h-screen border-2 shadow-xl  bg-gradient-to-br from-purple-200 via-blue-4000 to-indigo-600  w-60 border-r fixed left-0 top-0 text-grey-400">
<div className="font-bold text-3xl m-6 flex items-center mt-5">
    <BrainIcon/>
    
</div>
<div className="m-7 text-xl font-bold text-grey-400 ">
<Sidebarelement icon={<TwitterIcon/>} text="twitter"/>
</div>
<div className="m-7 text-xl font-bold text-grey-400">
<Sidebarelement icon={<YoutubeIcon/>} text="Youtube"/>
</div>


</div>
}