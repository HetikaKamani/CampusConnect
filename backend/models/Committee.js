import mongoose from "mongoose";

const committeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    followers: [
      {
        type: String, // storing email or userId
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Committee = mongoose.model("Committee", committeeSchema);

export default Committee;