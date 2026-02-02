import { useEffect, useState } from "react"
import { getOrders } from "../../api/orderApi"
import OrderRow from "./OrderRow"

const OrdersContainer = () => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getOrders({
        status,
        page,
        limit: 5
      })

      setOrders(response.data)
      setMeta(response.meta)
    } catch (err) {
      setError("Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [status, page])

  return (
    <>
      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => {
          setPage(1)
          setStatus(e.target.value)
        }}
      >
        <option value="">All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="Ready">Ready</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Loading / Error */}
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Orders List */}
      {!loading &&
        orders.map((order) => (
          <OrderRow
            key={order._id}
            order={order}
            refreshOrders={fetchOrders}
          />
        ))}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div style={{ marginTop: "10px" }}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page} of {meta.totalPages}
          </span>

          <button
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default OrdersContainer
