import { useState } from "react";
import API from "../api/axios";  
import { useNavigate } from "react-router-dom";

function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");    
    const navigate = useNavigate();

    const handleRegister = async () => {

        if (!name || !email || !password) {
        setError("Please fill all fields");
        return;
    }
     if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        setError("Please enter a valid email");
        return;
    }

    try {

        const response = await API.post(
            "/api/users/register",
            {
                name: name,
                email: email,
                password: password
            }
        );

        console.log(response.data);
        alert("Registration successful!");

        navigate("/login");

    }
    catch (err) {

        setError(err.response?.data?.message || "Registration failed");
        console.log("Registration failed", err);

    }
};

    return (
         <div className="register-container">

        <h1>Register</h1>

        <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p  className="register-error">{error}</p>}
        <button onClick={handleRegister}>
            Register
        </button>

    </div>
    )
}
export default Register;