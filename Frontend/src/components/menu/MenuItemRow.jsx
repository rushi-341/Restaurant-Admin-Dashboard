import { toggleAvailability } from "../../api/menuApi"
import "../../styles/status.css"
const MenuItemRow = ({ item, setMenuItems }) => {
  const handleToggle = async () => {
    const prev = item.isAvailable

    // OPTIMISTIC UPDATE
    setMenuItems((items) =>
      items.map((m) =>
        m._id === item._id ? { ...m, isAvailable: !m.isAvailable } : m
      )
    )

    try {
      await toggleAvailability(item._id)
    } catch {
      // ROLLBACK
      setMenuItems((items) =>
        items.map((m) =>
          m._id === item._id ? { ...m, isAvailable: prev } : m
        )
      )
      alert("Failed to update availability")
    }
  }

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>₹{item.price}</td>
      <td>
        <span
          className={`status ${
            item.isAvailable ? "available" : "unavailable"
          }`}
          onClick={handleToggle}
          style={{ cursor: "pointer" }}
        >
          {item.isAvailable ? "Available" : "Unavailable"}
        </span>
      </td>
    </tr>
  )
}

export default MenuItemRow
