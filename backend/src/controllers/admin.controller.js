import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";

export const registerAdmin = async (req, res) => {
    try {
        const {
            generalInfo,
            email,
            mobile,
            password,
        } = req.body;

        // Prevent duplicate admin
        const existingAdmin = await Admin.findOne({
            $or: [{ email }, { mobile }],
        });

        if (existingAdmin) {
            return res.status(409).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            email,
            mobile,
            password: hashedPassword,

            organisation: {
                name: generalInfo.org_name,
                panCard: generalInfo.pan_card,
                address: generalInfo.org_address,
            },

            contactPerson: {
                name: generalInfo.contact_name,
                email: generalInfo.contact_email,
                mobile: generalInfo.contact_mobile,
            },

            bankDetails: {
                bankName: generalInfo.bank_name,
                accountNumber: generalInfo.account_number,
                ifscCode: generalInfo.ifsc_code,
            },
        });

        return res.status(201).json({
            message: "Admin registered successfully",
            adminId: admin._id,
            status: admin.status,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
