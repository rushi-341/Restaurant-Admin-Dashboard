import MenuItemRow from "./MenuItemRow"
import "../../styles/table.css"

const MenuTable = ({ menuItems, loading, error, setMenuItems }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map((item) => (
          <MenuItemRow
            key={item._id}
            item={item}
            setMenuItems={setMenuItems}
          />
        ))}
      </tbody>
    </table>
  )
}

export default MenuTable
