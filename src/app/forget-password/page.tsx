"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const router = useRouter();
  const [userdate, setUserdate] = useState({
    username: "",
    email: ""
  });

  const handleVerify = async () => {
    try {
      const res = await axios.post("/api/auth/user/check-account", userdate);
      //  console.log(res);
      toast.success(res.data.message);
      router.push(`/forget-password/${res.data.token}`);
    } catch (error: any) {
      console.log("Error is : ", error);
      toast.error(error.response?.data?.error);
    }
  }

  return (
    <div className="min-h-[92vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-white mb-2">
          Verify Your Account
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-6">
          Please confirm your details to continue
        </p>

        {/* Username */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm text-neutral-300">
            Username
          </label>
          <input
            type="text"
            value={userdate.username}
            placeholder="Enter your username"
            onChange={(e) =>
              setUserdate({ ...userdate, username: e.target.value })
            }
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 mb-5">
          <label className="text-sm text-neutral-300">
            Email
          </label>
          <input
            type="email"
            value={userdate.email}
            placeholder="you@example.com"
            onChange={(e) =>
              setUserdate({ ...userdate, email: e.target.value })
            }
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleVerify}
          className="w-full py-2.5 rounded-lg font-medium bg-amber-400 text-black hover:bg-amber-300 transition"
        >
          Verify Account
        </button>

      </div>
    </div>
  );
}