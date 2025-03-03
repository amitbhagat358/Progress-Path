"use client";

import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const { loginUser } = useUserContext();
  const [state, action, pending] = useActionState(login, undefined);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { data: session } = useSession();
  console.log("session", session);

  useEffect(() => {
    if (!pending) {
      if (state?.userId) {
        loginUser();
        toast.success("Login Successful", {
          description: "Welcome back!",
        });
        router.push("/dashboard");
      } else if (state?.message) {
        toast.error(state.message, {
          description: state.description,
        });
      }
    }
  }, [state, pending]);

  return (
    <div className="w-full p-5 h-screen flex flex-col justify-center items-center gap-10">
      <form
        action={action}
        className="w-full sm:w-[450px] border shadow-lg rounded-lg p-5"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Enter email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          disabled={pending}
          type="submit"
          className={`w-full p-2 mt-4 font-semibold rounded-md focus:outline-none focus:ring-2 ${
            pending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {pending ? "Logging in..." : "Login"}
        </Button>

        <Button
          type="button"
          className="google-button"
          variant="outline"
          onClick={() => signIn("google")}
        >
          Continue with Google
        </Button>
      </form>
      <div>
        New Here?
        <Link href={"/signup"}>
          <span className="ml-3 underline">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
