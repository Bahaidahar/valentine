"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ValentineCard, ValentineShape } from "../types/valentine";
import { Plus, Copy } from "lucide-react";
import { createValentine } from "@/app/actions/createValentine";

const colors = [
  { tailwind: "bg-gradient-to-br from-red-400 to-red-500", value: "#f87171" },
  { tailwind: "bg-gradient-to-br from-pink-400 to-pink-500", value: "#ec4899" },
  {
    tailwind: "bg-gradient-to-br from-purple-400 to-purple-500",
    value: "#a855f7",
  },
  { tailwind: "bg-gradient-to-br from-rose-400 to-rose-500", value: "#fb7185" },
  {
    tailwind: "bg-gradient-to-br from-fuchsia-400 to-fuchsia-500",
    value: "#e879f9",
  },
  {
    tailwind: "bg-gradient-to-br from-violet-400 to-violet-500",
    value: "#8b5cf6",
  },
];

const shapes = [
  {
    name: "heart",

    value: ValentineShape.HEART,
  },
  {
    name: "circle",

    value: ValentineShape.CIRCLE,
  },
  {
    name: "rectangle",

    value: ValentineShape.RECTANGLE,
  },
];

export default function ValentineCreator() {
  const [card, setCard] = useState<Partial<ValentineCard>>({
    color: "#f87171",
    shape: ValentineShape.HEART,
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [valentineUrl, setValentineUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createValentine(card);
      if (result.token) {
        const url = `${window.location.origin}/valentine/${result.token}`;
        setValentineUrl(url);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Error creating valentine:", error);
    }
  };

  const handleCreateAnother = () => {
    setCard({
      color: "#f87171",
      shape: ValentineShape.HEART,
      message: "",
    });
    setShowSuccess(false);
    setValentineUrl("");
  };

  return (
    <div className="relative min-h-screen mt-12">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-red-100 max-w-xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Create Your Valentine
              </h1>
              <p className="text-gray-600 mt-2">
                Make something special for someone special
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-700 font-medium mb-3">
                  Choose Color
                </label>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color, index) => (
                    <motion.button
                      key={color.value}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                        color.tailwind
                      } ${
                        card.color === color.value
                          ? "ring-4 ring-offset-2 ring-red-500"
                          : ""
                      } shadow-lg transform transition-all hover:shadow-xl`}
                      onClick={() => setCard({ ...card, color: color.value })}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-700 font-medium mb-3">
                  Choose Shape
                </label>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {shapes.map((shape, index) => (
                    <motion.button
                      key={shape.name}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium flex items-center gap-2 ${
                        card.shape === shape.value
                          ? "bg-red-500 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200"
                      } transform transition-all`}
                      onClick={() => setCard({ ...card, shape: shape.value })}
                    >
                      <span>{shape.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-700 font-medium mb-3">
                  Your Message
                </label>
                <textarea
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  rows={4}
                  value={card.message}
                  onChange={(e) =>
                    setCard({ ...card, message: e.target.value })
                  }
                  placeholder="Write your valentine message..."
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white py-3 sm:py-4 rounded-lg transition-all text-base sm:text-lg font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    ❤️
                  </motion.span>
                  Create Valentine
                </span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-red-100 max-w-xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-6xl mb-4"
              >
                💝
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Valentine Created!
              </h3>
              <p className="text-gray-600 mb-6">
                Your valentine card is ready to share with someone special
              </p>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateAnother}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Create Another
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigator.clipboard.writeText(valentineUrl);
                    alert("Link copied to clipboard!");
                  }}
                  className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2 group"
                >
                  <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Copy Link
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
