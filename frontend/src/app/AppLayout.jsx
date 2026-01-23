"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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

  if (!mounted) return null;

  const shouldHideLayout = HIDE_LAYOUT_PATHS.includes(pathname);

  if (shouldHideLayout) {
    return (
      <ThemeRegistry>
        <Provider store={store}>{children}</Provider>
      </ThemeRegistry>
    );
  }

  return (
    <ThemeRegistry>
      <Provider store={store}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </Provider>
    </ThemeRegistry>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
