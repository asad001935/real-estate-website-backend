const express = require("express");
const router = express.Router();
const  verifyToken  = require("../middlewares/verifyToken");
const {isAdmin} = require("../middlewares/authMiddleware")
const { createProperty, deleteProperty, getOneProperty, getPropertyList, editProperty, getFeatured } = require("../controllers/propertyController");




router.post("/createProperty", verifyToken, isAdmin, createProperty);
router.get("/getProperty/:id", verifyToken, isAdmin, getOneProperty);
router.delete("/deleteProperty/:id", verifyToken, isAdmin, deleteProperty);
router.get("/getAllProperty", verifyToken, getPropertyList);
router.put("/editProperty/:id", verifyToken, isAdmin, editProperty);
router.get("/getFeatured", getFeatured)

module.exports = router