import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    date: {
      day: String,
      monthYear: String,
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    time: String,

    venue: { type: String, required: true },

    committee: { type: String, required: true },

    committeeId: {
      type: String,
      required: true,
      enum: ["technical", "cultural", "sports", "literary", "entrepreneurship"],
    },

    category: String,

    status: {
      type: String,
      default: "Upcoming",
    },

    tags: [String],

    image: { type: String, required: true },

    updates: [
      {
        type: {
          type: String,
          enum: ["General", "Update", "Result", "Postponement"],
          default: "Update",
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    rsvps: {
      type: [rsvpSchema],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
