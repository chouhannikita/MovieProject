import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: { type: String, required: true },
    description: String,
    duration: { type: Number, required: true }, // minutes
    genre: [String],
    language: String,
    releaseDate: Date,
    posterUrl: String,

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

movieSchema.index({ adminId: 1, title: 1 }, { unique: true });

export const Movie = model("Movie", movieSchema);
