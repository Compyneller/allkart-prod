"use client";
import LoginForm from "features/auth/login-form";
import { authClient } from "@/lib/auth-client";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session: any) => {
      if (session.data != null) {
        router.back();
      }
    });
  }, [router]);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 w-full h-dvh">
      <div className="w-full hidden md:block border-r bg-primary/5">
        <div className="p-6 flex items-center gap-2">
          <ShoppingCart className="text-primary" />{" "}
          <h5 className="text-2xl font-semibold text-primary">Swadesi</h5>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-xs text-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
