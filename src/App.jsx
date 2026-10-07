import { Routes, Route,useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import Register from "./pages/Register";

function App() {

 
  return (
    <>
    <Navbar/>
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route 
        path="/register"
        element={<Register/>}
      />  

      <Route path="/orders"
      element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
      <Route
        path="/products"
        element={<ProtectedRoute><Products />
        </ProtectedRoute>}
      />

      <Route path="/cart" element={<ProtectedRoute><Cart/>
      </ProtectedRoute>}/>
    </Routes>
    </>
  );
}

export default App;