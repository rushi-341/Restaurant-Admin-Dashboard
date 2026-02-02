const express = require("express")
const app = express()
const cors = require("cors")
const connectToDb = require("./src/config/db")
const MenuRoutes = require("./src/routes/menu-routes")
const OrderRoutes = require("./src/routes/order-routes")

require('dotenv').config()
connectToDb()
app.use(cors())
app.use(express.json())

app.use("/api/orders",OrderRoutes)
app.use("/api/menu",MenuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is listening to port ${PORT}`)
})