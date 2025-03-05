import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Layout = ({
  isLoggedIn = false,
  userName = "Guest User",
  userAvatar = "",
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        userAvatar={userAvatar}
      />
      <div className="flex">
        <Sidebar isLoggedIn={isLoggedIn} />
        <div className="ml-64 w-full pt-[70px]">
          <main className="min-h-[calc(100vh-70px-200px)]">
            <Outlet />
          </main>
          <Footer className="mt-auto" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
