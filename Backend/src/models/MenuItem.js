const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Name of Menu item is required'],
        index : true
    },
    description : {
        type: String,
    },
    category : {
        type : String,
        required : [true,"Enter category of the item"],
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage']
    },
    price : {
        type : Number,
        required : [true,"Enter price of the item"]
    },
    ingredients:{
        type: [String]
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    },
    preparationTime :{
        type : Number,
    },
    imageUrl : {
        type : String,
    }
},{timestamps : true})

menuItemSchema.index({
  name: "text",
  ingredients: "text"
})
module.exports = mongoose.model("MenuItem",menuItemSchema)