import API from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const navigate=useNavigate();

    const login = async () => {
        setError("");
        setLoading(true);
        try{
        const response = await API.post(
             "/api/users/login",
             {
                email:email,
                password:password        
             }
        );
        const token = response.data.token;
        localStorage.setItem("token",token);

       window.location.href = "/products";
        }
        catch(err){
            setError("Invalid email or password");
        }
        finally{
            setLoading(false)
        }
    }

   
    return(
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            {error && <p className="login-error">{error}</p>}
            <label>Email :  <input 
                type="email" 
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /></label>
            <label>Password : <input 
                type="password" 
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /></label>
            <button onClick={login} disabled={loading}>{loading ? "Logging in ..." : "Login"}</button>
            <p className="register-link">Don't have an account?{" "}
                <button className="register-link-btn" onClick={() => navigate("/register")}>
                Register
                </button>
            </p>
        </div>
    );
}

export default Login;