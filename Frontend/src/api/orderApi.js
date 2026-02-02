import axios from "axios"

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/orders"

export const getOrders = async (params = {}) => {
  const res = await axios.get(API_URL, { params })
  return res.data
}

export const updateOrderStatus = async (id, status) => {
  await axios.patch(`${API_URL}/${id}/status`, { status })
}
