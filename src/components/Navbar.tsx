import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BookOpen, LogIn, Menu, User, UserPlus } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Navbar = ({
  isLoggedIn = false,
  userName = "Guest User",
  userAvatar = "",
}: NavbarProps) => {
  return (
    <header className="w-full h-[70px] bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 z-50 shadow-sm transition-colors duration-200">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold text-primary">Rollon</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] hover:text-primary dark:hover:text-[#4A90E2] transition-colors"
          >
            Home
          </Link>
          <a
            href="#features"
            className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] hover:text-primary dark:hover:text-[#4A90E2] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] hover:text-primary dark:hover:text-[#4A90E2] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] hover:text-primary dark:hover:text-[#4A90E2] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("testimonials")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Testimonials
          </a>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] hover:text-primary dark:hover:text-[#4A90E2] transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    {userAvatar ? (
                      <AvatarImage src={userAvatar} alt={userName} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userName}</p>
                    <p className="w-[200px] truncate text-sm text-gray-500 dark:text-gray-400">
                      {userName.toLowerCase()}@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Quizzes</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hidden md:flex">
                  <LogIn className="mr-2 h-4 w-4" /> Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Sign up
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
