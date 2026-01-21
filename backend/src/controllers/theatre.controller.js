import Theatre from "../models/theatre.model.js";
import Admin from "../models/admin.model.js";

export const createTheatre = async (req, res) => {
    try {
        const adminId = req.body.userId;

        // 1. Check admin status
        const admin = await Admin.findById(adminId);
        if (!admin || admin.status !== "Active") {
            return res.status(403).json({
                message: "Admin is not approved to create theatres",
            });
        }

        // 2. Validate input
        const { name, city, address } = req.body;
        if (!name || !city || !address) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // 3. Create theatre
        const theatre = await Theatre.create({
            adminId,
            name,
            city,
            address,
        });

        return res.status(201).json({
            message: "Theatre created successfully",
            theatre,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create theatre",
            error: error.message,
        });
    }
};

export const getAdminTheatres = async (req, res) => {
    try {
        const adminId = req.user.adminId;

        const theatres = await Theatre.find({ adminId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                page: 1,
                limit: 10,
                total: 2,
                theatres: theatres
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch theatres",
            error: error.message,
        });
    }
};

export const getTheatreById = async (req, res) => {
    try {
        const theatreId = req.params.id;

        const theatre = await Theatre.findById(theatreId);
        if (!theatre) {
            return res.status(404).json({
                message: "Theatre not found",
            });
        }

        return res.status(200).json({
            success: true,
            theatre,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch theatre",
            error: error.message,
        });
    }
}

export const getAllTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                page: 1,
                limit: 10,
                total: theatres.length,
                theatres: theatres
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch theatres",
            error: error.message,
        });
    }
}

export const deleteTheatre = async (req, res) => {
    try {
        const theatreId = req.params.id;

        const theatre = await Theatre.findByIdAndDelete(theatreId);
        if (!theatre) {
            return res.status(404).json({
                message: "Theatre not found",
            });
        }

        return res.status(200).json({
            message: "Theatre deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete theatre",
            error: error.message,
        });
    }
}

export const updateTheatre = async (req, res) => {
    try {
        const theatreId = req.params.id;
        const { name, city, address } = req.body;

        // Validate input
        if (!name || !city || !address) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const theatre = await Theatre.findByIdAndUpdate(
            theatreId,
            { name, city, address },
            { new: true }
        );

        if (!theatre) {
            return res.status(404).json({
                message: "Theatre not found",
            });
        }

        return res.status(200).json({
            message: "Theatre updated successfully",
            theatre,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update theatre",
            error: error.message,
        });
    }
};
