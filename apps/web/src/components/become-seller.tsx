"use client";
import { useUserSession } from "hooks/useUserSession";
import Link from "next/link";
import React from "react";

const BecomeSeller = () => {
  const userRole = useUserSession();

  if (userRole?.user?.role != "user") {
    return null;
  }

  return <Link href="/onboarding">Become a seller</Link>;
};

export default BecomeSeller;
