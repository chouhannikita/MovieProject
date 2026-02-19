import { Chip } from "@mui/material";

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

export const theatreTableColumns = [
  {
    key: "name",
    header: "Theatre"
  },
  {
    key: "city",
    header: "Location"
  },
  {
    key: "totalScreens",
    header: "Screens"
  },
  {
    key: "totalSeats",
    header: "Seats"
  },
  {
    key: "totalShows",
    header: "Shows",
    render: (value) => <Chip label={value} color="primary" />
  },
  {
    key: "occupancy",
    header: "Occupancy",
    render: (value) => (
      <div className="flex items-center gap-2">
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <span>{value}%</span>
      </div>
    )
  }
];

export const screenTableColumns = [
  {
    key: "name",
    header: "Screen Name"
  },
  {
    key: "totalSeats",
    header: "Total Seats"
  },
  {
    key: "theatreName",
    header: "Theatre"
  },
  {
    key: "actions",
    header: "Action"
  }
];

export const movieTableColumns = [
  {
    key: "title",
    header: "Title"
  },
  {
    key: "duration",
    header: "Duration"
  },
  {
    key: "actions",
    header: "Action"
  }
];

export const screenFormFields = ({ handleScroll, theatreOptions }) => {
  return (
    [
      {
        name: "name",
        label: "Screen Name",
        type: "text",
        required: true,
      },
      {
        name: "totalSeats",
        label: "Total Seats",
        type: "text",
        required: true,
      },
      {
        name: "theatreId",
        label: "Theatre",
        type: "async-select",
        required: true,
        options: theatreOptions || [],
        onScroll: handleScroll
      }
    ]
  )
}

export const movieFormFields = () => {
  return (
    [
      {
        name: "title",
        label: "Movie Name",
        type: "text",
        required: true,
      },
      {
        name: "duration",
        label: "Duration",
        type: "time",
        required: true,
      },
      {
        name: "posterUrl",
        label: "Poster",
        type: "file",
      },
      {
        name: "genre",
        label: "Genre",
        type: "multiselect",
        options: genreOptions,
      },
      {
        name: "language",
        label: "Language",
        type: "multiselect",
        options: languageOptions,
      },
      {
        name: "releaseDate",
        label: "Release Date",
        type: "date",
      },
      {
        name: "description",
        label: "Description",
        type: "text",
        multiline: true,
        rows: 3,
      }
    ]
  )
}

export const genreOptions = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"]
export const languageOptions = ["English", "Hindi", "Tamil", "Telugu", "Malayalam"]
