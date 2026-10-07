import { useState,useEffect } from "react";
import API from "../api/axios"; 
import OrderCard from "../components/OrderCard";

function Orders(){

    const [orders,setOrders] = useState([]);
    useEffect(() => {
       const fetchOrders = async () => {
       const token = localStorage.getItem("token");
       try{
       const response = await API.get("/api/orders",{
        headers : {
            Authorization : `Bearer ${token}`
        }
       }) 
       setOrders(response.data);
       }
       catch(err){
        console.log("can't get Orders"+err);
       }
       }
      
       fetchOrders();
       
    },[])
    return(
        <>
        {orders.map((order) => (
         <OrderCard key={order.id} order={order}/>
        ))}
        </>
    )
}

export default Orders ;