"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";
import { LogOut } from "lucide-react";

const SignOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Signed out successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      className="w-full"
      variant={"destructive"}
      size={"sm"}
      onClick={handleSignOut}>
      {loading ? <Spinner /> : <LogOut />} Sign Out
    </Button>
  );
};

export default SignOut;
