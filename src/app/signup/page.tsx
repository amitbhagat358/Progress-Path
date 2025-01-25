"use client";

import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const { loginUser } = useUserContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!pending) {
      if (state?.userId) {
        loginUser(state.userId);
        toast.success("Sign Up Successful", {
          description: "Welcome !",
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
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10 p-5">
      <form
        action={action}
        className="w-full sm:w-[450px] border shadow-lg rounded-lg p-5"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Username
          </label>
          <Input
            id="username"
            name="username"
            placeholder="Enter username"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 "
          />
          {state?.errors?.username && (
            <p className="text-red-500 text-sm mt-1">{state.errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Enter email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 "
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
            <div className="mt-2 text-sm text-red-500">
              <p>Password must:</p>
              <ul className="list-disc list-inside">
                {state.errors.password.map((error) => (
                  <li key={error} className="text-red-600">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          disabled={pending}
          type="submit"
          className={`w-full p-2 mt-4 font-semibold  rounded-md  focus:outline-none focus:ring-2  ${
            pending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {pending ? "Submitting..." : "Sign Up"}
        </Button>
      </form>
      <div>
        Already have an account?
        <Link href={"/login"}>
          <span className="ml-3 underline">Login</span>
        </Link>
      </div>
    </div>
  );
}
