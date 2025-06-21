import { Dashboard } from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import FriendsSaveit from "./pages/FriendsSaveit"
import Home from "./pages/Home"
import { BrowserRouter,Routes, Route } from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/friendsaveit" element={<FriendsSaveit/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
