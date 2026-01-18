"use client";
import Link from "next/link";
import { motion } from "motion/react";

export default function ExploreButton() {
  return (
    <div className="flex justify-center my-2">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link
          href="/groups"
          className="group inline-flex items-center gap-2 text-3xl font-semibold bg-orange-400 text-black py-2 px-5 rounded-2xl shadow-lg shadow-orange-400/40 hover:shadow-orange-500/60 transition-all duration-300"
        >
          Explore now
          <span className="group-hover:translate-x-2 transition-transform duration-300">
            →
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
