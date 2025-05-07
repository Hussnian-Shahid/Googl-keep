import React, { useEffect } from "react";
import { FiX, FiTag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Editnote = ({
  editModalOpen,
  editingNote,
  cancelEdit,
  updateNote,
  setEditingnote,
  categories,
}) => {
  // When note is being edited, update the title and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingnote({ ...editingNote, [name]: value });
  };

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && editModalOpen) {
        cancelEdit();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [editModalOpen, cancelEdit]);

  // Return null if there's no modal to show
  if (!editModalOpen || !editingNote) return null;

  return (
    <AnimatePresence>
      {editModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={cancelEdit}
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
              onClick={cancelEdit}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>

            <h2 className="text-white text-xl font-semibold mb-4">Edit Note</h2>

            {/* Edit form */}
            <div className="space-y-4">
              {/* Note title */}
              <div>
                <label className="block text-white/80 text-sm mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="input"
                  value={editingNote.input || ""}
                  onChange={handleInputChange}
                  className="w-full bg-[#525355] text-white text-base rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Note content */}
              <div>
                <label className="block text-white/80 text-sm mb-1">
                  Content
                </label>
                <textarea
                  name="desc"
                  value={editingNote.desc || ""}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full bg-[#525355] text-white text-base rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-white/80 text-sm mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={editingNote.category || "Personal"}
                    onChange={handleInputChange}
                    className="w-full bg-[#525355] cursor-pointer text-white text-base rounded-md py-2 px-3 outline-none appearance-none pr-10 focus:ring-2 focus:ring-blue-500"
                  >
                    {categories &&
                      categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiTag className="text-white/70 w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelEdit}
                  className="bg-white/10 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={updateNote}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Save Changes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Editnote;
