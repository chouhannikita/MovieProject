import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true },
    address: { type: String, required: true },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    totalScreens: { type: Number, default: 0 },
    totalSeats: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Theatre", theatreSchema);

