import axios from "axios"

const API_BASE_URL = "http://localhost:3000/api/orders"

// Fetch orders
export const getOrders = async (params = {}) => {
  try {
    const res = await axios.get(API_BASE_URL, { params })
    return res.data
  } catch (error) {
    throw error
  }
}

// Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/${id}/status`, {
      status,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
