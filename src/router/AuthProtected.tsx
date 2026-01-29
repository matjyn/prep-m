import React from "react";
import { useUserStore } from "../stores/user";

interface AuthProtectedProps {
  children: React.ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="w-full text-center py-5 animateIn">Please log in to access this page.</div>
    );
  }

  return <>{children}</>;
};

export { AuthProtected };
