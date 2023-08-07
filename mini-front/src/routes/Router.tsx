import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../pages/user/Signin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        {/* <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
