"use client";
import { useUserSession } from "hooks/useUserSession";
import Link from "next/link";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import UserMenu from "./user-menu";

const User = () => {
  const { user, loading, error } = useUserSession();

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {!user || error ? (
        <Button asChild variant="ghost" size="sm" className="text-sm">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      ) : (
        <UserMenu data={user} />
      )}
    </>
  );
};

export default User;
