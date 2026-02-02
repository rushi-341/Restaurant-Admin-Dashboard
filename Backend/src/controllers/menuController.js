const menuItem = require("../models/MenuItem")


const getMenuItems = async(req,res)=>{
    try{
         const { category, availability, minPrice, maxPrice } = req.query
         //bulind a dynamic mongodbFilter
         const filter = {}
         if(category){
            filter.category = category
         }
         if (availability !== undefined) {
            filter.isAvailable = availability === "true"
        }

         if(minPrice || maxPrice){
            filter.price = {}
            if(minPrice){
                filter.price.$gte = Number(minPrice)
            }
            if(maxPrice){
                filter.price.$lte = Number(maxPrice)
            }
         }
         const menuItems = await menuItem.find(filter).sort({createdAt : -1})
         res.status(200).json({
            success:true,
            message : "Successfully fetched menuItems",
            menuItems
         })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success : false,
            message : 'error in fetching items',
            error : e.message
        })
    }
}
const searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query

    // Empty search → return all items
    if (!q || q.trim() === "") {
      const items = await menuItem.find().sort({ createdAt: -1 })
      return res.status(200).json({
        success: true,
        data: items
      })
    }

    const regex = new RegExp(q, "i")

    const results = await menuItem.find({
      $or: [
        { name: regex },
        { ingredients: regex }
      ]
    }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: results
    })
  } catch (e) {
    console.error("Search error:", e.message)
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: e.message
    })
  }
}
const getMenuItemById = async(req,res)=>{
    try{
        const {id} = req.params
        const menuItemById = await menuItem.findById(id)
        if(menuItemById){
            res.status(200).json({
                success : true,
                message : "Found out the menu item with the given id",
                menuItemById
            })
        }
        else{
            res.status(404).json({
                success : false,
                message : "The item you are trying to findout is not available",
            })
        }
    }catch(e){
        res.status(500).json({
            success : false,
            message : "error in fetching item by id",
            error : e.message
        })
    }
}
const createNewMenuItem = async(req,res)=>{
   try {
    const {
      name,
      description,
      category,
      price,
      ingredients,
      isAvailable,
      preparationTime,
      imageUrl
    } = req.body

    const newMenuItem = await menuItem.create({
      name,
      description,
      category,
      price,
      ingredients,
      isAvailable,
      preparationTime,
      imageUrl
    })

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: newMenuItem
    })
  }catch(e){
        res.status(500).json({
        success : false,
        message : "Something went wrong",
        error : e.message
        })
    }
}
const updateMenuItemById = async(req,res) =>{
    try{
        const {id} = req.params
        const updatedMenuItem = await menuItem.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true,runValidators:true
            })
        if(!updatedMenuItem){
            return(
            res.status(404).json({
                success : false,
                message : "menu item is not found"
            }))
        }
        res.status(200).json({
            success : true,
            message : "Update menuitem successfully",
            data :updatedMenuItem
        })
    }catch(e){
        res.status(500).json({
        success : false,
        message : "Something went wrong",
        error : e.message
        })
    }
}
const deleteMenuItemById = async(req,res)=>{
    try{
        const {id} = req.params
        const deletedItem = await menuItem.findByIdAndDelete(id)
        if(!deletedItem){
            return(
                res.status(404).json({
                    success : false,
                    message : "The menu item is not found"
                })
            )
        }
        res.status(200).json({
            success:true,
            message:"Successfully deleted the menu item",
            data : deletedItem
        })
    }catch(e){
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : e.message
        })
    }
}
const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params

    const menuItemToToggle = await menuItem.findById(id)

    // ADD THIS BLOCK HERE
    if (!menuItemToToggle) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      })
    }

    menuItemToToggle.isAvailable = !menuItemToToggle.isAvailable
    await menuItemToToggle.save()

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: menuItemToToggle
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e.message
    })
  }
}


module.exports = {getMenuItems,
    getMenuItemById,
    searchMenuItems,
    createNewMenuItem,
    updateMenuItemById,
    deleteMenuItemById,
    toggleAvailability
}