const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    orderNumber : {
        type : String,
        unique : true
    },
    items :[{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
    },
    quantity: Number,
    price: Number
     }],
    totalAmount : {
        type : Number
    },
    status : {
        type : String,
        enum : ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']
    },
    customerName : {
        type:String
    },
    tableNumber : {
        type : Number
    }
},{timestamps : true})

module.exports = mongoose.model("Order",OrderSchema)