const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    type: {
      type: String,
      enum: ["house", "Flat", "Apartment", "Plot", "Villa", "flat", "plot", "villa", "House"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema)
