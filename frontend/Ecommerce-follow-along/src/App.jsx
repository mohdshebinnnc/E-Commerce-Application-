
import  Login from "./components/Login"   

import SignUp from "./components/SignUp"                                                                    
import Home from "./components/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <>
    {/* <SignUp /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>   
    </Router>
    </>
  );
}
export default App;


