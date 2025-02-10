import  Login from "./components/Login"   
import SignUp from "./components/SignUp"                                                                    
import Home from "./components/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductForm from "./components/ProductForm"
import EditProduct from "./components/EditProduct";


function App() {
  return (
    <>
    {/* <SignUp /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productForm" element={<ProductForm/>}/>
        <Route path="/editProduct" element={<EditProduct/>}/>

      </Routes>   
    </Router>
    </>
  );
}
export default App;

