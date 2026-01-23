export const ORGANISATION_FIELDS = [
  {
    label: "Organisation / Individual Name",
    name: "org_name",
  },
  {
    label: "PAN Card Number",
    name: "pan_card",
  },
];

export const CONTACT_FIELDS = [
  {
    label: "Full Name",
    name: "contact_name",
  },
  {
    label: "Email Address",
    name: "contact_email",
  },
  {
    label: "Mobile Number",
    name: "contact_mobile",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const BANK_FIELDS = [
  {
    label: "Bank Name",
    name: "bank_name",
  },
  {
    label: "Account Number",
    name: "account_number",
  },
  {
    label: "Bank IFSC",
    name: "ifsc_code",
  },
];

// constants/theatreFormFields.js
export const theatreFormFields = [
  {
    name: "name",
    label: "Theatre Name",
    type: "text",
    required: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    rows: 3,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["ACTIVE", "INACTIVE"],
  },
];