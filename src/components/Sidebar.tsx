import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, Save, FileText, User, Home } from "lucide-react";

interface SidebarProps {
  className?: string;
  isLoggedIn?: boolean;
}

const Sidebar = ({ className, isLoggedIn = false }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
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

  return (
    <div
      className={cn(
        "w-64 bg-white border-r border-gray-200 h-screen fixed top-[70px] left-0 z-40 shadow-sm",
        className,
      )}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-6 px-2">Rollon</h3>
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
                )}
              >
                <span
                  className={cn(
                    "mr-3",
                    isActive ? "text-primary" : "text-gray-500",
                  )}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {!isLoggedIn && (
        <div className="absolute bottom-8 inset-x-0 px-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">
              Sign in to save quizzes
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Create an account to save your quizzes and track your progress.
            </p>
            <Link
              to="/login"
              className="block text-center bg-primary text-white text-sm py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
