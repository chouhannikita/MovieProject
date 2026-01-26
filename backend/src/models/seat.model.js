import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
    {
        screenId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Screen",
            required: true,
        },

        seatNumber: { type: String, required: true },
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

seatSchema.index({ screenId: 1 });

export default mongoose.model("Seat", seatSchema);