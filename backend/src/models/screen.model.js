import mongoose from "mongoose";

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
screenSchema.index(
    { theatreId: 1, name: 1 },
    { unique: true }
);

export default mongoose.model("Screen", screenSchema);