const express = require("express");
const { createInquiry, getAllInquiries } = require("../controllers/inquiryController");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const  verifyToken  = require("../middlewares/verifyToken");

router.post("/createInquiry", verifyToken, createInquiry);
router.get("/getAllInquiries",verifyToken, isAdmin, getAllInquiries)

module.exports = router;