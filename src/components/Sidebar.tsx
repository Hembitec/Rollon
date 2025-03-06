import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Save,
  FileText,
  User,
  LogOut,
  Menu,
  BookOpen as Logo,
  ChevronLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SidebarProps {
  className?: string;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Sidebar = ({
  className,
  isLoggedIn = false,
  userName = "John Doe",
  userAvatar = "",
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Always start collapsed on mobile
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  // Handle responsive sidebar collapse on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      name: "Create Quiz",
      path: "/create",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Saved Quizzes",
      path: "/saved",
      icon: <Save className="h-5 w-5" />,
    },
    {
      name: "Take Test",
      path: "/test",
      icon: <FileText className="h-5 w-5" />,
    },
    { name: "Profile", path: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile menu button - only visible when sidebar is collapsed */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-0 left-0 z-50 p-2 h-[70px] flex items-center justify-center bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${!collapsed ? "hidden" : ""}`}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div
        className={cn(
          "bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200 h-screen fixed top-0 left-0 z-40 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
          collapsed
            ? "-translate-x-full md:translate-x-0 md:w-16"
            : "w-64 translate-x-0",
          className,
        )}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center">
                <Logo className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-primary">Rollon</span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className={cn(
                "p-2 rounded-md hover:bg-gray-100 transition-colors",
                collapsed ? "ml-auto" : "",
              )}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <Menu className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100",
                    collapsed ? "justify-center" : "justify-start",
                  )}
                  title={collapsed ? item.name : ""}
                >
                  <span
                    className={cn(
                      collapsed ? "mr-0" : "mr-3",
                      isActive ? "text-primary" : "text-gray-500",
                    )}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <div className="flex items-center gap-3 py-2 mb-4">
              <Avatar>
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-medium">{userName}</h3>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors w-full text-gray-600 hover:bg-gray-100",
              collapsed ? "justify-center" : "justify-start",
            )}
            title={collapsed ? "Sign Out" : ""}
          >
            <span className={collapsed ? "mr-0" : "mr-3"}>
              <LogOut className="h-5 w-5" />
            </span>
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
