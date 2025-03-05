import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-10 w-10 text-primary" />
            <span className="ml-2 text-2xl font-bold text-primary">Rollon</span>
          </Link>
        </div>
        {title && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Rollon. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
