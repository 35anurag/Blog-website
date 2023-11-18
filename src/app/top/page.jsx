"use client";
import React, { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

const Top = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="h-screen">
      <motion.div
        style={{ scale }}
        className="relative flex flex-col items-center justify-center h-screen bg-[#0B0D21]"
      >
        <p className="absolute w-[10rem] h-[10rem] bg-white rounded-full blur-[10rem]"></p>
        <p className="text-[10rem] font-bold text-[#e4e3de]">Blog</p>
        <p className="text-[1.5rem] font-semibold text-[#e4e3de]">
          Create your free space
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Top;
