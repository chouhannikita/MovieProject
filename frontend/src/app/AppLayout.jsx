"use client";

import React, { useEffect, useState } from "react";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import Header from "./header/Header";

const HIDE_LAYOUT_PATHS = [
  "/admin/auth/login",
  "/admin/auth/register",
  "/admin/auth/register/account-setup",
];

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shouldHideLayout = HIDE_LAYOUT_PATHS.includes(pathname);

  if (shouldHideLayout) {
    return <ThemeRegistry>{children}</ThemeRegistry>;
  }

  return (
    <ThemeRegistry>
      <Header />
      {children}
    </ThemeRegistry>
  );
};

export default AppLayout;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
