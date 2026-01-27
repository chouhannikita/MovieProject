import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import { generateToken } from "../config/utils.js";

export const registerAdmin = async (req, res) => {
    try {
        const {
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
            ...req.body,
            email,
            mobile,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Admin registered successfully",
            adminId: admin._id,
            status: admin.status,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (admin.status === "PENDING") {
            return res.status(403).json({
                message: "Your account is pending approval by Super Admin",
            });
        }

        if (admin.status === "REJECTED") {
            return res.status(403).json({
                message: "Your registration has been rejected",
            });
        }

        const token = generateToken(admin);

        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                role: admin.role,
                status: admin.status,
                organisation: admin.organisation.name,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
