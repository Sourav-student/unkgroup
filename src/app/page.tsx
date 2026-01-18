"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ExploreButton from "@/components/ui/ExploreButton";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen px-4 sm:px-8 py-10 flex flex-col gap-10 max-w-7xl mx-auto"
    >
      <div className="flex justify-center">
        <ExploreButton />
      </div>

      {/* CARD 1 */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold mb-3 text-white">
            Private Groups
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            Introducing India’s first private group chat platform with an
            app-like web experience.
          </p>
          <p className="mt-3 text-neutral-400">
            Join gaming, study, memes, and fun groups created by users.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/private_group.png"
            alt="Private groups"
            width={420}
            height={420}
            className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </motion.div>

      {/* CARD 2 */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row-reverse gap-6 items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/private_group.png"
            alt="Why private groups"
            width={420}
            height={420}
            className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold mb-3 text-white">
            Why is it required?
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            Users can share ideas, compare opinions, and gain clarity—
            without revealing their real identity.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}