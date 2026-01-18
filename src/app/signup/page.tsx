"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [btnDisable, setBtnDisable] = React.useState(false);
  const [message, setMessage] = useState("");

  const onSignup = async () => {
    try {
      const res = await axios.post("/api/auth/user/signup", user);
      toast.success(res.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failded", error.message);
      toast.error(error.response?.data?.error);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0) {
      setBtnDisable(false);
      setMessage("");
    } else {
      setBtnDisable(true)
    }

    if (user.password.length < 4 || user.password.length > 15) {
      setBtnDisable(true);
      setMessage("Passwod must be of min 4 length");
    } else {
      setBtnDisable(false);
      setMessage("")
    }
  }, [user])

  return (
    <div className="min-h-[92vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center text-white mb-2">
          Create Account
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-6">
          Sign up to get started
        </p>

        {/* Username */}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="username" className="text-sm text-neutral-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="your_username"
            required
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

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
            required
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
            placeholder="4-15 characters"
            required
            minLength={4}
            maxLength={15}
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Message */}
        {message && (
          <p className="text-sm text-center mt-3 text-amber-400">
            {message}
          </p>
        )}

        {/* Button */}
        <button
          onClick={onSignup}
          disabled={btnDisable}
          className="w-full mt-5 py-2.5 rounded-lg font-medium bg-amber-400 text-black hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {btnDisable ? "Fill all fields" : "Sign up"}
        </button>

        {/* Footer */}
        <p className="text-sm text-neutral-400 text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-amber-400 hover:underline ml-1">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}