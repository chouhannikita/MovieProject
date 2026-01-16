"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: "#ffffff",
          color: "#0B0B0B",
          minHeight: "48px !important",
          maxHeight: "60px !important",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <MenuItem sx={{ fontWeight: 500 }}>Admin</MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
