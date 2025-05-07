import { motion, AnimatePresence } from "framer-motion";

const Editnote = ({
  editModalOpen,
  editingNote,
  cancelEdit,
  updateNote,
  setEditingnote,
}) => {

    const setEditingNote = setEditingnote;
  return (
    <div>
      {/* Edit Modal */}
      <AnimatePresence>
        {editModalOpen && editingNote && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={cancelEdit}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md 
                  bg-[#303134] border border-white/20 rounded-xl shadow-xl p-6 z-50"
            >
              <h2 className="text-white text-xl font-semibold mb-4">
                Edit Note
              </h2>

              {/* Edit Title */}
              <input
                value={editingNote.input}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, input: e.target.value })
                }
                type="text"
                placeholder="Title"
                className="w-full bg-[#404144] text-white text-lg font-semibold outline-none mb-3 p-3 rounded-lg placeholder-white/70"
              />

              {/* Edit Description */}
              <textarea
                value={editingNote.desc}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, desc: e.target.value })
                }
                rows="4"
                placeholder="Take a note..."
                className="w-full bg-[#404144] text-white text-base outline-none resize-none p-3 rounded-lg placeholder-white/60 mb-6"
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelEdit}
                  className="bg-transparent border cursor-pointer border-white/30 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: "#60a5fa" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={updateNote}
                  className="bg-blue-500/80 cursor-pointer text-white px-4 py-2 rounded-md"
                >
                  Update
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Editnote;
