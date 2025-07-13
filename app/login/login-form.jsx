"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// This is client component (CSR - Client Side Rendering)
export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR);

  const validateForm = ({ email, password }) => {
    if (email === "") {
      setError({
        error: true,
        message: "Email is required",
      });
      return false;
    } else if (password === "") {
      setError({
        error: true,
        message: "Password is required",
      });
      return false;
    } else if (!EMAIL_REGEX.test(email)) {
      setError({
        error: true,
        message: "Email is invalid",
      });
      return false;
    }
    setError(DEFAULT_ERROR);
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // console.log("validate ",validateForm({email, password}));
    // console.log("reg ",!(EMAIL_REGEX.test(email)));

    if (validateForm({ email, password })) {
      await signIn.email(
        { email, password },
        {
          onSuccess: () => {
            setLoading(false);
            // Handle successful login, e.g., redirect to dashboard
            redirect("/admin");
            
          },
          onError: (ctx) => {
            setError({
              error: true,
              message: ctx.error.message,
            });
            // loading false
            setLoading(false);
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentails to login to account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline "
                  >
                    Forget your password
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              {/* Error message here */}
              <div className="flex justify-center">
                {error.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-700">
                    {error.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className=""animate-spin/> }Login
                </Button>
                <Button type="button" className="w-full" variant="outline" disabled={isLoading}>
                  Login with Google
                </Button>
              </div>
            </div>
            <div className = "mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                   Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
