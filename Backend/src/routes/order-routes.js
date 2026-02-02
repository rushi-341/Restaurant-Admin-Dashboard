const express = require("express")
const router = express.Router()
const {
    getAllOrders,
    createNewOrder,
    getOrdersBasedOnId,
    updateOrderStatus
} = require("../controllers/orderController")

router.get("/",getAllOrders)
router.get("/:id",getOrdersBasedOnId)
router.post("/",createNewOrder)
router.patch("/:id/status",updateOrderStatus)

module.exports  = router