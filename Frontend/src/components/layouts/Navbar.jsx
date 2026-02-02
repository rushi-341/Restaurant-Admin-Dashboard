import { NavLink } from "react-router-dom"
import "../../styles/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/menu">Menu</NavLink>
      <NavLink to="/orders">Orders</NavLink>
    </nav>
  )
}

export default Navbar
