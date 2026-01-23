"use client";
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DownloadIcon from "@mui/icons-material/Download";
import CustomButton from "@/components/custom-button/CustomButton";
import dynamic from "next/dynamic";

const AddTheatre = dynamic(() => import("./AddTheatre"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function TheatreMainPage() {
  const [open, setOpen] = useState(false);
  const theatres = [
    {
      name: "PVR Treasure Island",
      location: "Indore, MP",
      screens: 6,
      seats: 1200,
      shows: 24,
      occupancy: "78%",
      facilities: ["3D", "IMAX", "Dolby Atmos"],
    },
    {
      name: "INOX Central Mall",
      location: "Bhopal, MP",
      screens: 4,
      seats: 800,
      shows: 16,
      occupancy: "65%",
      facilities: ["3D"],
    },
  ];

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Theatre</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Screens</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Shows</TableCell>
              <TableCell>Occupancy</TableCell>
              <TableCell>Facilities</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {theatres.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="font-semibold">{t.name}</TableCell>
                <TableCell>{t.location}</TableCell>
                <TableCell>{t.screens}</TableCell>
                <TableCell>{t.seats}</TableCell>
                <TableCell>
                  <Chip label={t.shows} color="primary" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: t.occupancy }}
                      />
                    </div>
                    <span>{t.occupancy}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    {t.facilities.map((f, idx) => (
                      <Chip key={idx} label={f} color="secondary" />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
