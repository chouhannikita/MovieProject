"use client";

import React from "react";
import PropTypes from "prop-types";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_MENU } from "./sidebarConfig";
import Link from "next/link";

const Sidebar = ({ title = "BookMyShow Admin" }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">{"title"}</h2>
        {/* <p className="text-xs text-gray-500">Admin Dashboard</p> */}
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {SIDEBAR_MENU.map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path;

            return (
              <Link
                key={label}
                href={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition
                  ${
                    isActive
                      ? "bg-red-50 text-red-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon fontSize="small" />
                <span>{label}</span>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string,
};

export default Sidebar;
