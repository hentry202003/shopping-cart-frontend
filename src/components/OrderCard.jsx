function OrderCard({order}){
    return (
        <div className="order-card">
        <img
        className="order-image"
        src={order.product.image}
        alt={order.product.name}
        />
        <p className="order-product">Product : {order.product.name}</p>
        <p className="order-detail">Quantity : {order.quantity}</p>
        <p className="order-detail">Status : <span className="order-status">{order.status}</span></p>
        <p className="order-detail">Order Date : {new Date(order.orderDate).toLocaleString()} </p>
        <h2 className="order-total">Total Amount : ₹{order.totalAmount}</h2>
        </div>
    )
}

export default OrderCard ;