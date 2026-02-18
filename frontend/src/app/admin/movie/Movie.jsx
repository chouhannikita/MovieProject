"use client"
import React, { useState } from "react";
import AddMovie from "./AddMovie";
import CustomButton from "@/components/custom-button/CustomButton";

const Movie = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="w-full">
        <CustomButton
          fullWidth
          onClick={() => setOpen(true)}
          variant="contained"
          buttonText="+ Add Movie"
          className="!text-white !py-3"
          style={{
            background: "linear-gradient(90deg,#ff004f,#ff5f00)",
          }}
        />
      </div>
      <AddMovie
        open={open}
        handleClose={() => setOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
};

export default Movie;
