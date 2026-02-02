const Order = require("../models/Order")
const MenuItem = require("../models/MenuItem")
const getAllOrders = async(req,res)=>{
    try{
        const { page = 1, limit = 10, status } = req.query

        const filter = {}

    // Status filter
    if (status) {
      filter.status = status
    }

    const skip = (Number(page) - 1) * Number(limit)

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    const totalOrders = await Order.countDocuments(filter)

    res.status(200).json({
      success: true,
      message: "Fetched orders successfully",
      meta: {
        totalOrders,
        currentPage: Number(page),
        totalPages: Math.ceil(totalOrders / limit)
      },
      data: orders
    })
    }catch(e){
        res.status(500).json({
            success:false,
            message : "Something went wrong",
            error : e.message
        })
    }
}
const getOrdersBasedOnId = async(req,res)=>{
    try{
        const {id} = req.params
        const orderBasedOnId = await Order.findById(id).populate("items.menuItem")
        if(!orderBasedOnId){
            return res.status(404).json({
                success:false,
                message : "Enter valid id"
            })
        }
        res.status(200).json({
            success:true,
            message : "Successfully fetched orders based on id",
            data : orderBasedOnId
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message : "Something went wrong",
            error : e.message
        })
    }
}
const createNewOrder = async(req,res)=>{
    try{
         const { items, customerName, tableNumber } = req.body

    //  Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item"
      })
    }

    let totalAmount = 0
    const processedItems = []

    // Process each item
    for (const item of items) {
      const { menuItem, quantity } = item

      // Fetch menu item
      const menuItemDoc = await MenuItem.findById(menuItem)

      if (!menuItemDoc) {
        return res.status(404).json({
          success: false,
          message: "Menu item not found"
        })
      }

      if (!menuItemDoc.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `${menuItemDoc.name} is not available`
        })
      }

      const itemTotal = menuItemDoc.price * quantity
      totalAmount += itemTotal

      processedItems.push({
        menuItem: menuItemDoc._id,
        quantity,
        price: menuItemDoc.price
      })
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`

    //  Create order
    const newOrder = await Order.create({
      orderNumber,
      items: processedItems,
      totalAmount,
      customerName,
      tableNumber
    })

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder
    })
    }catch(e){
        res.status(500).json({
            success:false,
            message : "Something went wrong",
            error : e.message
        })
    }
}
const updateOrderStatus = async(req,res)=>{
    try{
        const {id} = req.params
        const {status} = req.body
        const allowedStatuses = [
            "Pending",
            "Preparing",
            "Ready",
            "Delivered",
            "Cancelled"
        ]
        const updatedOrder = await Order.findByIdAndUpdate(
                  id,
                 { status },
                 {
                      new: true,
                      runValidators: true
                 }
        )

         if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }

    //  Success
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder
    })
    }catch(e){
        res.status(500).json({
            success:false,
            message : "Something went wrong",
            error : e.message
        })
    }
}
module.exports = {getAllOrders,getOrdersBasedOnId,createNewOrder,updateOrderStatus}