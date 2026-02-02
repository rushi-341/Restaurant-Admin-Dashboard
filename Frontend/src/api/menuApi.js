import axios from "axios"

const API_BASE_URL = "http://localhost:3000/api/menu"

// Fetch menu items (normal fetch or search)
export const getMenuItems = async (params = {}) => {
  try {
    // If search query exists → use search endpoint
    if (params.q && params.q.trim() !== "") {
      const res = await axios.get(`${API_BASE_URL}/search`, {
        params: { q: params.q },
      })
      return res.data.data
    }

    // Otherwise → normal menu fetch
    const res = await axios.get(API_BASE_URL, { params })
    return res.data.menuItems || res.data.data
  } catch (error) {
    throw error
  }
}

// Toggle availability of a menu item
export const toggleAvailability = async (id) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/${id}/availability`)
    return res.data
  } catch (error) {
    throw error
  }
}
