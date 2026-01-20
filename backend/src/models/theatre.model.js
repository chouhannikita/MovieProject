import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Theatre", theatreSchema);


const screenSchema = new mongoose.Schema(
    {
      theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true,
      },
  
      name: { type: String, required: true },
      totalSeats: { type: Number, required: true },
    },
    { timestamps: true }
  );
  
 mongoose.model("Screen", screenSchema);

 const seatSchema = new mongoose.Schema(
    {
      screenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Screen",
        required: true,
      },
  
      seatNumber: { type: String, required: true }, // A1, A2
      row: { type: String, required: true },
  
      category: {
        type: String,
        enum: ["REGULAR", "PREMIUM", "RECLINER"],
        required: true,
      },
  
      basePrice: { type: Number, required: true },
    },
    { timestamps: true }
  );
  
 mongoose.model("Seat", seatSchema);
  
  