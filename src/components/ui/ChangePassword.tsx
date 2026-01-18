"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  token: string;
};

export default function ChangePassword({ token }: Props) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `/api/auth/user/forget-password/${token}`, { newPassword }
      );

      toast.success("Password updated successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[92vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-white mb-2">
          Update Password
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-6">
          Choose a strong new password for your account
        </p>

        {/* New Password */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm text-neutral-300">
            New Password
          </label>
          <input
            type="password"
            placeholder="4–15 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1 mb-5">
          <label className="text-sm text-neutral-300">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full py-2.5 rounded-lg font-medium bg-amber-400 text-black hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}