import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        // Organisation Info
        organisation: {
            name: { type: String, required: true },
            panCard: { type: String, required: true },
            address: { type: String, required: true },
        },

        // Contact Person
        contactPerson: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            mobile: { type: String, required: true },
        },

        // Bank Details
        bankDetails: {
            bankName: { type: String, required: true },
            accountNumber: { type: String, required: true },
            ifscCode: { type: String, required: true },
        },

        // Auth / Role
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        role: { type: String, default: "ADMIN" },
        status: {
            type: String,
            enum: ["PENDING", "ACTIVE", "REJECTED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
