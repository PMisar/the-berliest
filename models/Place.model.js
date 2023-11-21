const { Schema, model } = require("mongoose");

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "tourist",
        "breluncoffee",
        "restaurant",
        "bar",
        "club",
        "shop",
        "exhibition",
        "party",
        "park",
        "museum",
      ],
      lowercase: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Place = model("Place", placeSchema);

module.exports = Place;
