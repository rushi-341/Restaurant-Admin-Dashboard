const mongoose = require("mongoose")
require("dotenv").config()

const connectToDb = require("../../config/db")
const MenuItem = require("../../models/MenuItem")
const Order = require("../../models/Order")

const seedData = async () => {
  try {
    await connectToDb()

    console.log(" Seeding database...")

    // Clear existing data
    await MenuItem.deleteMany()
    await Order.deleteMany()

    // -------------------------
    // MENU ITEMS (15 items)
    // -------------------------
    const menuItems = await MenuItem.insertMany([
      // Appetizers
      {
        name: "Veg Spring Rolls",
        category: "Appetizer",
        price: 120,
        ingredients: ["cabbage", "carrot", "flour"]
      },
      {
        name: "Paneer Tikka",
        category: "Appetizer",
        price: 180,
        ingredients: ["paneer", "curd", "spices"]
      },

      // Main Course
      {
        name: "Paneer Butter Masala",
        category: "Main Course",
        price: 220,
        ingredients: ["paneer", "butter", "cream"]
      },
      {
        name: "Veg Biryani",
        category: "Main Course",
        price: 200,
        ingredients: ["rice", "vegetables", "spices"]
      },
      {
        name: "Dal Tadka",
        category: "Main Course",
        price: 160,
        ingredients: ["dal", "ghee", "spices"]
      },
      {
        name: "Veg Fried Rice",
        category: "Main Course",
        price: 170,
        ingredients: ["rice", "vegetables"]
      },

      // Desserts
      {
        name: "Gulab Jamun",
        category: "Dessert",
        price: 90,
        ingredients: ["milk solids", "sugar"]
      },
      {
        name: "Ice Cream",
        category: "Dessert",
        price: 100,
        ingredients: ["milk", "sugar"]
      },
      {
        name: "Brownie",
        category: "Dessert",
        price: 140,
        ingredients: ["chocolate", "flour"]
      },

      // Beverages
      {
        name: "Masala Chai",
        category: "Beverage",
        price: 50,
        ingredients: ["tea", "milk", "spices"]
      },
      {
        name: "Cold Coffee",
        category: "Beverage",
        price: 90,
        ingredients: ["coffee", "milk"]
      },
      {
        name: "Fresh Lime Soda",
        category: "Beverage",
        price: 70,
        ingredients: ["lime", "soda"]
      },

      // Extra items
      {
        name: "Butter Naan",
        category: "Main Course",
        price: 40,
        ingredients: ["flour", "butter"]
      },
      {
        name: "Roti",
        category: "Main Course",
        price: 25,
        ingredients: ["flour"]
      },
      {
        name: "Fruit Salad",
        category: "Dessert",
        price: 120,
        ingredients: ["fruits"]
      }
    ])

    console.log(" Menu items seeded")

    // -------------------------
    // ORDERS (10 orders)
    // -------------------------
    const orders = []

    for (let i = 0; i < 10; i++) {
      const item1 = menuItems[Math.floor(Math.random() * menuItems.length)]
      const item2 = menuItems[Math.floor(Math.random() * menuItems.length)]

      const items = [
        {
          menuItem: item1._id,
          quantity: 1,
          price: item1.price
        },
        {
          menuItem: item2._id,
          quantity: 2,
          price: item2.price
        }
      ]

      const totalAmount =
        item1.price * 1 + item2.price * 2

      orders.push({
        orderNumber: `ORD-${Date.now()}-${i}`,
        items,
        totalAmount,
        status: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"][i % 5],
        customerName: `Customer ${i + 1}`,
        tableNumber: i + 1
      })
    }

    await Order.insertMany(orders)

    console.log(" Orders seeded")
    console.log(" Database seeding completed")

    process.exit(0)
  } catch (error) {
    console.error(" Seeding failed:", error)
    process.exit(1)
  }
}

seedData()
