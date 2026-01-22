import Screen from "../models/screen.model.js";

export const createScreen = async (req, res) => {   
    try {
        const { theatreId, name, totalSeats } = req.body;

        if (!theatreId || !name || !totalSeats) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const screen = await Screen.create({
            theatreId,
            name,
            totalSeats,
        });

        return res.status(201).json({
            message: "Screen created successfully",
            screen,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create screen",
            error: error.message,
        });
    }
}

export const getScreensByTheatre = async (req, res) => {
    try {
        const theatreId = req.query.theatreId;

        const screens = await Screen.find({ theatreId });

        return res.status(200).json({
            message: "Screens fetched successfully",
            screens,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch screens",
            error: error.message,
        });
    }
}

//
export const getScreenById = async (req, res) => {
    try {
        const screenId = req.query.screenId;
        console.log("Screen ID:", screenId);

        const screen = await Screen.findById(screenId);

        if (!screen) {
            return res.status(404).json({
                message: "Screen not found",
            });
        }

        return res.status(200).json({
            message: "Screen fetched successfully",
            screen,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch screen",
            error: error.message,
        });
    }
}

export const updateScreen = async (req, res) => {
    try {
      const { screenId } = req.query;
      const { name, totalSeats } = req.body;
  
      // 2. Check screen exists
      const screen = await Screen.findById(screenId);
      if (!screen) {
        return res.status(404).json({ message: "Screen not found" });
      }
  
      // 3. Business validations
      if (name) {
        const duplicate = await Screen.findOne({
          theatreId: screen.theatreId,
          name,
          _id: { $ne: screenId }
        });
  
        if (duplicate) {
          return res.status(409).json({
            message: "Screen name already exists in this theatre"
          });
        }
      }
  
      if (totalSeats && totalSeats <= 0) {
        return res.status(400).json({
          message: "totalSeats must be greater than 0"
        });
      }
  
      // 4. Update
      if (name) screen.name = name;
      if (totalSeats) screen.totalSeats = totalSeats;
  
      await screen.save();
  
      return res.status(200).json({
        message: "Screen updated successfully",
        screen
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update screen",
        error: error.message
      });
    }
  };
  