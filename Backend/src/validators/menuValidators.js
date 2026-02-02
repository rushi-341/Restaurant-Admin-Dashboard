const { body } = require("express-validator")

exports.createMenuItemValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("category")
    .isIn(["Appetizer", "Main Course", "Dessert", "Beverage"])
    .withMessage("Invalid category"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("ingredients")
    .optional()
    .isArray()
    .withMessage("Ingredients must be an array"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("Availability must be boolean"),

  body("preparationTime")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Preparation time must be a positive number"),

  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be valid")
]
