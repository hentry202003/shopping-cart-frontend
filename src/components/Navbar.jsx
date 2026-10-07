import {NavLink , useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../api/axios";

function Navbar(){

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

    const fetchCurrentUser = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {

            const response = await API.get(
                "/api/users/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(response.data);

        }
        catch (err) {
            console.log("Failed to fetch current user", err);
        }
    };

    fetchCurrentUser();

}, []);

    const logOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        setMenuOpen(false);
        navigate("/login");
    }
    
    const [menuOpen , setMenuOpen] = useState(false);

    return(
        <>
        
            <nav className="navbar">
                <img  className="brand-logo" src="/3j-mart-logo.png" alt="3J Mart" />
            <button className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <span className="user-name">
                👤 {user?.name}
         </span>

            <NavLink
                className={({isActive}) => isActive ? "nav-active" : "nav"}
                to="/products"
                onClick={() => setMenuOpen(false)}
            >
                Products
            </NavLink>

            <NavLink
                className={({isActive}) => isActive ? "nav-active" : "nav"}
                to="/cart"
                onClick={() => setMenuOpen(false)}
            >
                Cart
            </NavLink>

            <NavLink
                className={({isActive}) => isActive ? "nav-active" : "nav"}
                to="/orders"
                onClick={() => setMenuOpen(false)}
            >
                Orders
            </NavLink>
            <button className="logout-btn" onClick={logOut}>Logout</button></div>
            
            </nav>
        
        </>
    );
}

export default Navbar;