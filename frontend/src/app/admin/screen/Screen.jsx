"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/custom-button/CustomButton";
import DataTable from "@/components/datatable/DataTable";
import { screenTableColumns } from "../adminConfig";
import { getAdminScreen } from "@/api/screen/screen";

export default function Screen() {
  const [open, setOpen] = useState(false);
  const [theatresData, setTheatresData] = useState([]);

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      const response = await getAdminScreen("69770f9dcb2c49f1600af163");
      console.log(response);
      setTheatresData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching theatres data:", error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="w-full">
        <CustomButton
          fullWidth={true}
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
        rowKey="_id"
      />
    </div>
  );
}
