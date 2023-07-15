import { Route, Routes } from "react-router-dom";
import ChatApp from "../pages/Chat";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Signup } from "../pages/SignUp";

export const Navigator=()=>{

return (
    <>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chats" element={<ChatApp />}></Route>

    </Routes>
    </>
)
}