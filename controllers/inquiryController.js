const Inquiry = require("../models/Inquiry");

exports.createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const user = req.user ? req.user._id : null; 
    const propertyId = req.body.propertyId || null;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are mandatory." });
    }

    const existingInquiry = await Inquiry.findOne({user, message, propertyId });

    if (existingInquiry) {
      return res
        .status(409)
        .json({
          message:
            "This inquiry is already listed. So wait for that one to solve. ",
        });
    }

    const newInquiry = new Inquiry({ user, name, email, message, propertyId });
    const savedInquiry = await newInquiry.save();

    return res.status(201).json({
      message: "Inquiry added successfully.",
      inquiry: savedInquiry,
    });
  } catch (err) {
    console.error("Error while adding inquiry:", err);
    return res.status(500).json({ message: "Server error. Try again later!" });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const allInquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All Inquiries fetched successfully.",
      inquiries: allInquiries,
    });
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};
