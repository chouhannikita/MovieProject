import {
    Dashboard,
    Movie,
    EventSeat,
    AccountBalance,
    BarChart,
    Settings,
  } from "@mui/icons-material";
  
  export const SIDEBAR_MENU = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: Dashboard,
    },
    {
      label: "Theatres",
      path: "/admin/theatres",
      icon: Movie,
    },
    {
      label: "Screens",
      path: "/admin/screens",
      icon: EventSeat,
    },
    {
      label: "Shows",
      path: "/admin/shows",
      icon: Movie,
    },
    {
      label: "Bookings",
      path: "/admin/bookings",
      icon: AccountBalance,
    },
    {
      label: "Reports",
      path: "/admin/reports",
      icon: BarChart,
    },
    {
      label: "Profile",
      path: "/admin/profile",
      icon: Settings,
    },
  ];
  