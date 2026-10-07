import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; 

function Cart(){

    const [cartItems,setCartItems] = useState([]);

    useEffect(() => {
    
        const fetchCart = async () => {

            const token = localStorage.getItem("token");
          
            try{
            const response = await API.get("/api/cart",
            {
                headers : 
                {
                    Authorization:`Bearer ${token}`
                }
            })
            setCartItems(response.data);
           
        }
        catch(err){
            console.log("Failed to fetch cart");
            console.log(err);
        }
        }
        fetchCart();
    },[]);

    const removeCart = async (cartId) => {

        const token = localStorage.getItem("token");
        try{
        await API.delete(`/api/cart/${cartId}`,
            {
                headers:
                {
                    Authorization :`Bearer ${token}`
                }
            }
        )
        const newItems = cartItems.filter((cart) => cart.id !== cartId);

        setCartItems(newItems);
        }
        catch(err){
            console.log("Failed to delete cart", err);
        }
    }
    const increaseQuantity = async (cartId) => {

        const token = localStorage.getItem("token");

        const selectedCart = cartItems.find((cart) => cart.id === cartId );

            if (selectedCart.quantity >= selectedCart.product.stock) {
                 return;
             }
        const newQuantity = selectedCart.quantity + 1 ; 

        const newItems = cartItems.map((cart) => {
            if(cart.id === cartId){
                return {
                    ...cart,
                quantity :newQuantity
                }
            }
            return cart ;
        })
        try{
            await API.put(`/api/cart/update/${cartId}`,{
            quantity : newQuantity
        },{
            headers :   {
                Authorization : `Bearer ${token}`
            }
        })
         setCartItems(newItems);
        }
        catch(err){
            console.log("can't update the quantity "+err);
        }
       
    }
    const decreaseQuantity = async (cartId) => {

        const token = localStorage.getItem("token");
        const selectedCart = cartItems.find((cart) => cart.id === cartId);

            if (selectedCart.quantity === 1) {
                return;
            }

        const newQuantity = selectedCart.quantity - 1 ;

        const newItems = cartItems.map((cart) => {
            if(cart.id === cartId){
                return{
                 ...cart,
                 quantity : newQuantity
                }
            }
            return cart ;
        })
        try {
            await API.put(`/api/cart/update/${cartId}`,{
                quantity : newQuantity 
            },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            setCartItems(newItems);
        }
        catch(err){
            console.log("can't update the quantity "+err);
        }

    }
    const total = cartItems.reduce((sum,cart) =>{
       return  sum + (cart.product.price * cart.quantity);
    },0);  
    const placeOrder = async (cartId) => {
        const token = localStorage.getItem("token");
       
        try{
            await API.post("/api/orders/place",
            {
            cartId : cartId},
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            const newItems = cartItems.filter((cart) => cart.id!==cartId);
            setCartItems(newItems);
        }
        catch(err){
            console.log("Failed to place order", err);
        }
    }

    const navigate = useNavigate();

return (
    <>
        <h1>Cart Page</h1>

        {cartItems.length === 0 ? (

            <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart.</p>

                <button onClick={() => navigate("/products")}>
                    Continue Shopping
                </button>
            </div>

        ) : (

            <>
                {cartItems.map((cart) => (

                    <div className="cart-card" key={cart.id}>

                        <div className="cart-content">

                            <img
                                className="cart-image"
                                src={cart.product.image}
                                alt={cart.product.name}
                            />

                            <div className="cart-details">

                                <h2 className="cart-product-name">
                                    {cart.product.name}
                                </h2>

                                <p className="cart-price">
                                    Price : ₹{cart.product.price}
                                </p>

                                <div className="quantity-controls">

                                    <button
                                        className="quantity-btn"
                                        onClick={() => decreaseQuantity(cart.id)}
                                    >
                                        −
                                    </button>

                                    <span className="quantity">
                                        {cart.quantity}
                                    </span>

                                    <button
                                        className="quantity-btn"
                                        onClick={() => increaseQuantity(cart.id)}
                                    >
                                        +
                                    </button>

                                </div>

                                <div className="cart-actions">

                                    <button
                                        className="delete-btn"
                                        onClick={() => removeCart(cart.id)}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="place-order-btn"
                                        onClick={() => placeOrder(cart.id)}
                                    >
                                        Place Order
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

                <div className="cart-summary">
                    <span>Cart Total</span>
                    <strong>₹{total}</strong>
                </div>

            </>

        )}

    </>
);
}

export default Cart;