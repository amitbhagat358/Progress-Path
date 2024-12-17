'use client';

import { signup } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useActionState } from 'react';

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <form
        action={action}
        className="w-[448px] shadow-lg rounded-lg p-10 border border-[#e3e3e7]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <Input
            id="username"
            name="username"
            placeholder="Enter username"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          />
          {state?.errors?.username && (
            <p className="text-red-500 text-sm mt-1">{state.errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Enter email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          />
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
          className={`w-full p-2 mt-4 text-white font-semibold  rounded-md  focus:outline-none focus:ring-2  ${
            pending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {pending ? 'Submitting...' : 'Sign Up'}
        </Button>
      </form>
      <div>
        Already have an account?
        <Link href={'/login'}>
          <span className="ml-3 underline">Login</span>
        </Link>
      </div>
    </div>
  );
}
