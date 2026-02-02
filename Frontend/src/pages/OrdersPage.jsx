import OrdersContainer from "../components/orders/OrdersContainer"
import "../styles/global.css"

const OrdersPage = () => {
  return (
    <div className="page-container">
      <h2>Orders Dashboard</h2>
      <OrdersContainer />
    </div>
  )
}

export default OrdersPage
