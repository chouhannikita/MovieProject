"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "@/components/custom-button/CustomButton";
import DataTable from "@/components/datatable/DataTable";
import { screenTableColumns } from "../adminConfig";
import AddScreen from "./AddScreen";
import { getAdminScreen } from "@/api/screen/screen";
import { useSelector } from "react-redux";

export default function ScreenClient() {
  const [open, setOpen] = useState(false);
  const [theatresData, setTheatresData] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminId = useSelector((state) => state.auth.userData?.id);

  const refreshScreens = async () => {
    setLoading(true);
    const response = await getAdminScreen(adminId);
    setTheatresData(response?.data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    refreshScreens();
  }, []);

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
      />

      <AddScreen
        open={open}
        handleClose={() => setOpen(false)}
        onSuccess={refreshScreens}
      />
    </div>
  );
}
