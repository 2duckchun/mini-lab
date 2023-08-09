import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../pages/user/SignUp";
import SignIn from "../pages/user/SignIn";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
