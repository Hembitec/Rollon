import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <AuthLayout title="Set New Password">
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
