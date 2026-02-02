import { useState } from "react"
import { updateOrderStatus } from "../../api/orderApi"

const OrderRow = ({ order, refreshOrders }) => {
  const [expanded, setExpanded] = useState(false)
  const [updating, setUpdating] = useState(false)

  const handleStatusChange = async (e) => {
    try {
      setUpdating(true)
      await updateOrderStatus(order._id, e.target.value)
      refreshOrders()
    } catch (err) {
      alert("Failed to update order status")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px"
      }}
    >
      <p>
        <strong>Order No:</strong> {order.orderNumber}
      </p>

      <p>
        <strong>Customer:</strong> {order.customerName || "N/A"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <select
          value={order.status}
          onChange={handleStatusChange}
          disabled={updating}
        >
          <option>Pending</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </p>

      <button onClick={() => setExpanded((prev) => !prev)}>
        {expanded ? "Hide Details" : "View Details"}
      </button>

      {expanded && (
        <ul style={{ marginTop: "10px" }}>
          {order.items.map((item) => (
            <li key={item._id}>
              {item.menuItem?.name} × {item.quantity} — ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrderRow
