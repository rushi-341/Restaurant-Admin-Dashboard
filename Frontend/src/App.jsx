import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MenuPage from "./pages/MenuPage"
import OrdersPage from "./pages/OrdersPage"
import Navbar from "./components/layouts/Navbar"

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
