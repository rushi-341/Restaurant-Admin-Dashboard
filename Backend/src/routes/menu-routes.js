const express = require("express")
const router = express.Router()
const {getMenuItems,
    searchMenuItems,
    getMenuItemById,
    createNewMenuItem,
    updateMenuItemById,
    deleteMenuItemById,
    toggleAvailability
} = require("../controllers/menuController")
const { createMenuItemValidator } = require("../validators/menuValidators")
const validateRequest = require("../middlewares/validateRequest")

router.get("/",getMenuItems)
router.get("/search",searchMenuItems)
router.get("/:id",getMenuItemById)
router.post("/",createMenuItemValidator,validateRequest,createNewMenuItem)
router.put("/:id",updateMenuItemById)
router.delete("/:id",deleteMenuItemById)
router.patch('/:id/availability', toggleAvailability)

module.exports = router