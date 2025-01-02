'use client';

import { login } from '@/app/actions/auth'; // Replace with your login action
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUserContext } from '../context/userContext';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const { loginUser } = useUserContext();
  const [state, action, pending] = useActionState(login, undefined);

  useEffect(() => {
    if (!pending) {
      if (state?.userId) {
        loginUser(state.userId);
        toast.success('Login Successful', {
          description: 'Welcome back!',
        });
        router.push('/dashboard');
      } else if (state?.message) {
        toast.error(state.message, {
          description: state.description,
        });
      }
    }
  }, [state, pending]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <form action={action} className="w-[448px] shadow-lg rounded-lg p-10 ">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

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
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          disabled={pending}
          type="submit"
          className={`w-full p-2 mt-4 text-white font-semibold rounded-md focus:outline-none focus:ring-2 ${
            pending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {pending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <div>
        New Here?
        <Link href={'/signup'}>
          <span className="ml-3 underline">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
