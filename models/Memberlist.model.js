const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    places: {
      type: String,
      enum: [],
      lowercase: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const List = model("List", userSchema);

module.exports = List;
