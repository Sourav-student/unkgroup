"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-neutral-950/70 backdrop-blur-md border-b border-neutral-800 px-5 py-3 flex items-center justify-between"
    >
      {/* Logo */}
      <h1 className="text-2xl font-semibold tracking-tight">
        Unk<span className="text-amber-400">Groups</span>
      </h1>

      {/* Navigation */}
      <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
        <Link
          href="/"
          className="text-neutral-300 hover:text-white transition"
        >
          Home
        </Link>
        <Link
          href="/groups"
          className="text-neutral-300 hover:text-white transition"
        >
          Groups
        </Link>
        <Link
          href="/profile"
          className="text-neutral-300 hover:text-white transition"
        >
          Profile
        </Link>
      </nav>

      <button className="space-y-1 bg-neutral-900 p-2 shadow-2xl rounded-lg cursor-pointer sm:hidden"
        onClick={() => setNavbarOpen((prev) => !prev)}>
        {!navbarOpen ?
          <>
            <div className="w-8 p-px bg-white" />
            <div className="w-6 p-px bg-white" />
            <div className="w-4 p-px bg-white" />
          </> : <span className="font-bold p-2">X</span>}
      </button>

      {navbarOpen && <nav className="absolute top-0 left-0 w-full flex flex-col mt-14 p-3 bg-neutral-900 sm:hidden items-center justify-center gap-6 text-sm font-medium rounded-2xl">
        <Link
          href="/"
          className="text-neutral-300 hover:text-white transition"
        >
          Home
        </Link>
        <Link
          href="/groups"
          className="text-neutral-300 hover:text-white transition"
        >
          Groups
        </Link>
        <Link
          href="/profile"
          className="text-neutral-300 hover:text-white transition"
        >
          Profile
        </Link>
      </nav>}
    </motion.header>
  );
}