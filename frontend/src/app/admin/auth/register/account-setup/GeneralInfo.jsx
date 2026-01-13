import React from "react";
import { TextField, Button, MenuItem } from "@mui/material";

const GeneralInfo = ({ Section,accountInfo,setAccountInfo }) => {
    
  return (
    <>
      <Section title="Organisation Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Organisation / Individual Name" fullWidth  />
          <TextField label="PAN Card Number" fullWidth />
        </div>

        <div className="mt-4">
          <TextField
            label="Organisation / Individual Address"
            fullWidth
            multiline
            rows={2}
          />
        </div>
      </Section>

      <Section title="Contact Person Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField label="Full Name" fullWidth />
          <TextField label="Email Address" fullWidth />
          <TextField label="Mobile Number" fullWidth />
        </div>
      </Section>

      <Section title="Bank Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Beneficiary Name" fullWidth />
          <TextField select label="Account Type" fullWidth defaultValue="">
            <MenuItem value="savings">Savings</MenuItem>
            <MenuItem value="current">Current</MenuItem>
          </TextField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TextField select label="Bank Name" fullWidth>
            <MenuItem value="sbi">SBI</MenuItem>
            <MenuItem value="hdfc">HDFC</MenuItem>
            <MenuItem value="icici">ICICI</MenuItem>
          </TextField>
          <TextField label="Account Number" fullWidth />
          <TextField label="Bank IFSC" fullWidth />
        </div>
      </Section>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="contained">Proceed</Button>
      </div>
    </>
  );
};

export default GeneralInfo;
