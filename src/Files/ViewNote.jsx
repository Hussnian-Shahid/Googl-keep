import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ViewNote = ({ viewModalOpen, viewingNote, closeView }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && viewModalOpen) {
        closeView();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [viewModalOpen, closeView]);

  // Return null if there's no modal to show
  if (!viewModalOpen || !viewingNote) return null;

  return (
    <AnimatePresence>
      {viewModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={closeView}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#303134] border border-white/10 rounded-xl shadow-xl p-5 w-full max-w-xl z-50"
          >
            {/* Close button */}
            <button
              onClick={closeView}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>

            {/* Category badge */}
            <div className="inline-block px-2.5 py-1 bg-white/10 rounded-full text-sm font-medium text-white mb-3">
              {viewingNote.category || "Uncategorized"}
            </div>

            {/* Note title */}
            <h2 className="text-white text-xl font-semibold mb-3">
              {viewingNote.input}
            </h2>

            {/* Note content */}
            <div className="bg-[#3c3d40] rounded-lg p-4 text-white/90 whitespace-pre-wrap">
              {viewingNote.desc}
            </div>

            {/* Close button */}
            <div className="flex justify-end mt-5">
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={closeView}
                className="bg-white/10 text-white py-2 px-4 rounded-md text-sm font-medium"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ViewNote;
