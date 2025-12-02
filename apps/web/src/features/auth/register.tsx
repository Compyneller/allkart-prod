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
import { signUpSchema } from "@repo/schema";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Password from "../../components/ui/password";
import { Separator } from "../../components/ui/separator";
import { Spinner } from "../../components/ui/spinner";
import GoogleButton from "./google-signin";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      const { data, error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL:
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      });
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("User created successfully, please check your email");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="space-y-2">
        <h5 className="text-2xl font-semibold">Create an account</h5>
        <p className="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button disabled={loading} className="w-full" type="submit">
            {loading && <Spinner />} Sign Up
          </Button>
          <p>
            Back to{" "}
            <Link href="/auth/login" className="text-primary">
              Login
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

export default RegisterForm;
