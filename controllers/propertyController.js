const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      for (let property of req.body) {
        if (!property.image || !property.type || !property.price || !property.location) {
          return res.status(400).json({ message: "All fields are mandatory for each property." });
        }
      }

      const savedProperties = await Property.insertMany(req.body);
      return res.status(201).json({
        message: "Multiple properties added successfully.",
        properties: savedProperties,
      });
    }

    const { image, type, price, location } = req.body;

    if (!image || !type || !price || !location) {
      return res.status(400).json({ message: "All fields are mandatory." });
    }

    const existingProperty = await Property.findOne({ type, price, location });

    if (existingProperty) {
      return res.status(409).json({ message: "This property is already listed." });
    }

    const newProperty = new Property({ image, type, price, location });
    const savedProperty = await newProperty.save();

    return res.status(201).json({
      message: "Property added successfully.",
      property: savedProperty,
    });
  } catch (err) {
    console.error("Error while adding property:", err);
    return res.status(500).json({ message: "Server error. Try again later!" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    console.log("Property deleted:", property);
    res.status(200).json({ message: "Property deleted successfully." });
  } catch (err) {
    console.error("Error while deleting property:", err);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};

exports.getOneProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({
      message: "Property fetched successfully.",
      property,
    });
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};

exports.getPropertyList = async (req, res) => {
  try {
    const allProperties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All properties fetched successfully.",
      properties: allProperties,
    });
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};

exports.editProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProperty) {
      return res
        .status(404)
        .json({ message: "Property not found. Cannot update." });
    }

    console.log("Property updated:", updatedProperty);
    res.status(200).json({
      message: "Property updated successfully.",
      property: updatedProperty,
    });
  } catch (err) {
    console.error("Error while updating property:", err);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const allProperties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All properties fetched successfully.",
      properties: allProperties,
    });
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
};

