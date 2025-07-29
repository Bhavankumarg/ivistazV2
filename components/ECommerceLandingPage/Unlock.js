"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
export default function Unlock() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div className="bg-black">
        <div className="relative w-full flex items-center justify-center h-40 z-0">
          <Link href="/contact-us">
            <motion.div
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              initial={{ width: 144, height: 144 }}
              animate={
                hovered
                  ? { width: 80, height: 80 }
                  : { width: 144, height: 144 }
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative rounded-full bg-[#111] cursor-pointer flex items-center justify-center overflow-hidden"
            >
              {/* Shrinking overlay */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#ED1C24] z-0"
                initial={{ scale: 2.5 }}
                animate={{ scale: hovered ? 0 : 1.5 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {/* Text fades out */}
              <motion.span
                className="text-[#DBDBDB] text-center z-10 text-xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                Unlock My Performance Audit Now
              </motion.span>

              {/* Arrow fades in */}
              <motion.div
                className="absolute z-10 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: hovered ? 0.15 : 0 }}
              >
                <FiArrowRight className="text-3xl" />
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );
}
