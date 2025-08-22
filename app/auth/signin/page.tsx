"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "../../../components/auth/LoginForm";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}