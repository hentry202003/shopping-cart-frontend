import API from "../api/axios"; 
import { useState } from "react";

function ProductCard({ product }) {

   const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const addToCart = async () => {

        const token = localStorage.getItem("token");

        setMessage("");
        setError("");
        setLoading(true);

        try {

            await API.post(
                "/api/cart/add",
                {
                    productId: product.id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Added to cart ✓");

        }
        catch (err) {

            console.log("Failed to add cart", err);

            setError("Failed to add to cart");

        }
        finally {

            setLoading(false);

        }
    };

  return (
    <div className="product-card">

            {message && (
                <p className="cart-success">
                    {message}
                </p>
            )}

            {error && (
                <p className="cart-error">
                    {error}
                </p>
            )}

            <img
                className="product-image"
                src={product.image}
                alt={product.name}
            />

            <h2 className="product-name">
                {product.name}
            </h2>

            <p className="product-info">
                Price: ₹{product.price}
            </p>

            <p className="product-info">
                Category: {product.category}
            </p>

            <p className="product-info">
                Stock: {product.stock}
            </p>

            <button
                className="add-cart-btn"
                onClick={addToCart}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add to Cart"}
            </button>

        </div>
    );
}

export default ProductCard;