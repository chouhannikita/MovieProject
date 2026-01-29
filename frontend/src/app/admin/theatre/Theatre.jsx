"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DownloadIcon from "@mui/icons-material/Download";
import CustomButton from "@/components/custom-button/CustomButton";
import dynamic from "next/dynamic";
import { getAdminTheatres } from "@/api/theatre/theatre";
import DataTable from "@/components/datatable/DataTable";
import { theatreTableColumns } from "../adminConfig";

const AddTheatre = dynamic(() => import("./AddTheatre"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function TheatreMainPage() {
  const [open, setOpen] = useState(false);
  const [theatresData, setTheatresData] = useState([]);

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      const response = await getAdminTheatres();
      console.log(response);
      setTheatresData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching theatres data:", error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Tabs value={0}>
        <Tab label="All (4)" />
        <Tab label="Active (3)" />
        <Tab label="Inactive (1)" />
      </Tabs>

      <div className="w-full">
        <CustomButton
          fullWidth={true}
          onClick={() => setOpen(true)}
          variant="contained"
          buttonText="+ Add Theatre"
          className="!text-white !py-3"
          style={{
            background: "linear-gradient(90deg,#ff004f,#ff5f00)",
          }}
        />
      </div>

      <AddTheatre open={open} handleClose={() => setOpen(false)} />

      <div className="flex gap-4 items-center">
        <Button variant="outlined" startIcon={<FilterAltIcon />}>
          Filter
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Export
        </Button>
      </div>

      <DataTable
        columns={theatreTableColumns}
        data={theatresData}
        rowKey="_id"
      />
    </div>
  );
}
