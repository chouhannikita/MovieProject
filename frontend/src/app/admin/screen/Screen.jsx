"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "@/components/custom-button/CustomButton";
import DataTable from "@/components/datatable/DataTable";
import { screenTableColumns } from "../adminConfig";
import AddScreen from "./AddScreen";
import { deleteAdminScreen, getAdminScreen } from "@/api/screen/screen";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSnackbar } from "@/context/SnackbarContext";

export default function ScreenClient() {
  const [open, setOpen] = useState(false);
  const [theatresData, setTheatresData] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminId = useSelector((state) => state.auth.userData?.id);
  const { showSnackbar } = useSnackbar();

  const refreshScreens = async () => {
    setLoading(true);
    const response = await getAdminScreen(adminId);
    setTheatresData(response?.data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (adminId) {
      refreshScreens();
    }
  }, [adminId]);

  const handleDelete = async (selectedScreen) => {
    const id = selectedScreen._id;
    const res = await deleteAdminScreen(id);
    if (res?.data?.success) {
      refreshScreens();
      showSnackbar("Screen deleted successfully", "success");
    } else {
      showSnackbar(
        res?.response?.data?.message || "Failed to delete screen",
        "error"
      );
    }
  };

  const actionsUI = (row) => {
    return (
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <EditIcon color="secondary" />
        <DeleteForeverIcon color="error" onClick={() => handleDelete(row)} />
      </Box>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="w-full">
        <CustomButton
          fullWidth
          onClick={() => setOpen(true)}
          variant="contained"
          buttonText="+ Add Screen"
          className="!text-white !py-3"
          style={{
            background: "linear-gradient(90deg,#ff004f,#ff5f00)",
          }}
        />
      </div>

      <DataTable
        columns={screenTableColumns}
        data={theatresData}
        loading={loading}
        rowKey="_id"
        actionsUI={actionsUI}
      />

      <AddScreen
        open={open}
        handleClose={() => setOpen(false)}
        onSuccess={refreshScreens}
      />
    </div>
  );
}
