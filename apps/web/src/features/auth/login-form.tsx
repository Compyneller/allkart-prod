"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@repo/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Password from "../../components/ui/password";
import { Separator } from "../../components/ui/separator";
import { Spinner } from "../../components/ui/spinner";
import GoogleButton from "./google-signin";
import { useAppDispatch } from "store/hook";
import { login } from "store/slices/userSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setLoading(true);
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      dispatch(
        login({
          id: data.user?.id,
          name: data.user?.name,
          email: data.user?.email,
          image: data.user?.image,
        })
      );
      setLoading(false);

      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full space-y-8">
      <div className="space-y-2">
        <h5 className="text-2xl font-semibold">Login</h5>
        <p className="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Password fields={field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col items-end">
            {" "}
            <Link className="text-sm text-primary mb-2" href="/reset-password">
              Forgot Password?
            </Link>
            <Button className="w-full" type="submit">
              {loading && <Spinner />} Login
            </Button>
          </div>
          <p>
            Didn't have account?{" "}
            <Link href="/auth/register" className="text-primary">
              Create one
            </Link>
          </p>
          <div className="flex items-center gap-2 justify-center">
            <Separator className="flex-1" /> <span>Or continue with</span>{" "}
            <Separator className="flex-1" />
          </div>
          <GoogleButton />
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
