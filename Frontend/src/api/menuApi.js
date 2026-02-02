import axios from "axios"

// IMPORTANT: Use environment variable
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/menu`

// Fetch menu items (normal fetch or search)
export const getMenuItems = async (params = {}) => {
  // Search
  if (params.q && params.q.trim() !== "") {
    const res = await axios.get(`${API_BASE_URL}/search`, {
      params: { q: params.q }
    })
    return res.data.data
  }

  // Normal fetch
  const res = await axios.get(API_BASE_URL)
  return res.data.menuItems
}

// Toggle availability
export const toggleAvailability = async (id) => {
  const res = await axios.patch(`${API_BASE_URL}/${id}/availability`)
  return res.data
}
