import React from "react";
import { Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const showSidebar = isLoggedIn && !isHomePage;
  const showFooter = isHomePage;
  const showNavbar = !isLoggedIn || isHomePage;

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && (
        <Navbar
          isLoggedIn={isLoggedIn}
          userName={userName}
          userAvatar={userAvatar}
        />
      )}
      <div className="flex">
        {showSidebar && (
          <Sidebar
            isLoggedIn={isLoggedIn}
            userName={userName}
            userAvatar={userAvatar}
          />
        )}
        <div
          className={`${showSidebar ? "sm:ml-16 lg:ml-64" : ""} w-full ${showNavbar ? "pt-[70px]" : ""} transition-all duration-300`}
        >
          <main className="min-h-[calc(100vh-70px-200px)]">
            <Outlet />
          </main>
          {showFooter && <Footer className="mt-auto" />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
