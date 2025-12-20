import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const superAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check email
        if (email !== process.env.SUPERADMIN_EMAIL) {
            return res.status(401).json({ message: "Unauthorized Email" });
        }

        // 2. Compare the entered password with hashed password stored in .env
        const isMatch = await bcrypt.compare(
            password,
            process.env.SUPERADMIN_PASSWORD   // must be HASHED in .env
        );

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { role: "superadmin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "SuperAdmin Login Successful",
            token,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};