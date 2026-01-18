"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type UserType = {
  email: string,
  password: string
}

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState<UserType>({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/user/login", user);
      toast.success(res.data.message);
      router.push('/');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[92vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center text-white mb-2">
          {isLoading ? "Processing..." : "Login"}
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-6">
          Welcome back! Please enter your details
        </p>

        {/* Email */}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email" className="text-sm text-neutral-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="password" className="text-sm text-neutral-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Forget password */}
        <div className="flex justify-end mb-4">
          <Link
            href="/forget-password"
            className="text-sm text-amber-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          onClick={onLogin}
          disabled={isLoading}
          className="w-full py-2.5 rounded-lg font-medium bg-amber-400 text-black hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-sm text-neutral-400 text-center mt-5">
          Not signed up?
          <Link href="/signup" className="text-amber-400 hover:underline ml-1">
            Signup now
          </Link>
        </p>
      </div>
    </div>
  );
}