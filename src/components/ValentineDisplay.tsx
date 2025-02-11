"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { ValentineCard } from "@/types/valentine";

const FloatingHeart = ({ delay = 0, scale = 1, left = "10%" }) => {
  return (
    <motion.div
      initial={{ y: 0, x: "-50%", opacity: 0 }}
      animate={{
        y: [-20, -150],
        opacity: [0, 1, 0],
        scale: [scale, scale * 1.2, scale],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      style={{ left }}
      className="absolute bottom-0"
    >
      <Heart className="w-6 h-6 text-red-400/30" fill="currentColor" />
    </motion.div>
  );
};

const FloatingSparkle = ({ delay = 0, right = "10%" }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: [-20, -100],
        opacity: [0, 1, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      style={{ right }}
      className="absolute bottom-0"
    >
      <Sparkles className="w-4 h-4 text-yellow-400/50" />
    </motion.div>
  );
};

function getShapeClass(shape: string) {
  switch (shape) {
    case "heart":
      return "relative";
    case "circle":
      return "rounded-full";
    default:
      return "rounded-lg";
  }
}

export default function ValentineDisplay({
  valentine,
}: {
  valentine: ValentineCard;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-rose-100 p-8 flex items-center justify-center relative overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <FloatingHeart
          key={`heart-${i}`}
          delay={i * 0.3}
          scale={0.5 + Math.random()}
          left={`${10 + i * 7}%`}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <FloatingSparkle
          key={`sparkle-${i}`}
          delay={i * 0.4}
          right={`${5 + i * 10}%`}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.02, rotate: [0, 1, -1, 0] }}
          transition={{ duration: 0.3 }}
          className={`
            ${valentine.color}
            ${
              valentine.shape === "heart" ? "" : "aspect-square"
            } ${getShapeClass(
            valentine.shape
          )} p-8 shadow-2xl backdrop-blur-sm max-w-2xl w-full flex items-center justify-center transform transition-all hover:shadow-3xl relative overflow-hidden group`}
        >
          {valentine.shape === "heart" && (
            <Heart
              className={` absolute inset-0 w-full h-full p-4 text-current`}
              color={valentine.color}
            />
          )}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white text-center font-medium drop-shadow-lg"
            >
              {valentine.message}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
