"use client";
import React from "react";
import Header from "./header/Header";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { usePathname } from "next/navigation";
import { PropTypes } from "prop-types";

const HIDE_LAYOUT_PATHS = ["/admin/auth/login", "/admin/auth/register"];

const AppLayout = ({ children }) => {
  const pathname = usePathname()
  const shouldHideLayout = HIDE_LAYOUT_PATHS.includes(pathname);

  if (shouldHideLayout) {
    return <>{children}</>;
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
