    import { useEffect, useState } from "react";
    import API from "../api/axios"; 
    import ProductCard from "../components/ProductCard";

    function Products(){

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");


    const fetchProducts = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await API.get(
                "/api/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProducts(response.data);

        }
        catch (err) {

            console.log("Failed to fetch products", err);

        }
    };



    const searchProducts = async () => {

        if (search.trim() === "") {

            fetchProducts();
            return;

        }

        const token = localStorage.getItem("token");

        try {

            const response = await API.get(
                `/api/products/search?name=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProducts(response.data);

        }
        catch (err) {

            console.log("Failed to search products", err);

        }
    };



    const filterByCategory = async (selectedCategory) => {

        if (selectedCategory === "") {

            setCategory("");
            fetchProducts();
            return;

        }

        setCategory(selectedCategory);

        const token = localStorage.getItem("token");

        try {

            const response = await API.get(
                `/api/products/category/${selectedCategory}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProducts(response.data);

        }
        catch (err) {

            console.log("Failed to filter products", err);

        }
    };

    useEffect(() => {

        fetchProducts();

    }, []);


return (
    <>
       <div className="product-controls">

        <div className="product-search">

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        searchProducts();
                    }
                }}
            />

            <button onClick={searchProducts}>
                Search
            </button>

        </div>


        <div className="category-filter">

            <select
                value={category}
                onChange={(e) => {
                    filterByCategory(e.target.value);
                }}
            >
                <option value="">All Categories</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Accessories">Accessories</option>
            </select>

        </div>

    </div>  
        <div className="product-grid">

            {products.length === 0 ? (

                <p className="no-products">
                    No products found
                </p>

            ) : (

                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))

            )}

        </div>
    </>
);
    }

    export default Products;