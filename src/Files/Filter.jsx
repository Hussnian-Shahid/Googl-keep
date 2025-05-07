import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiPlus } from "react-icons/fi";

const Filter = ({
  categories,
  activeCategory,
  setActiveCategory,
  addNewCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addNewCategory(newCategory.trim());
      setNewCategory("");
      setShowAddForm(false);
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* All category is always available */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
            activeCategory === "all"
              ? "bg-white text-[#202124]"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          All
        </motion.button>

        {/* Map through available categories */}
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === category
                ? "bg-white text-[#202124]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {category}
          </motion.button>
        ))}

        {/* Add new category button */}
        {!showAddForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-white/20 flex items-center gap-1"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add</span>
          </motion.button>
        )}

        {/* Form to add new category */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                autoFocus
                className="px-3 py-1.5 rounded-l-full text-sm bg-white/20 text-white placeholder-white/50 border-none outline-none w-32"
              />
              <button
                type="submit"
                className="bg-green-500/80 text-white p-1.5 hover:bg-green-500 transition-colors"
              >
                <FiCheck className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-red-500/80 text-white p-1.5 rounded-r-full hover:bg-red-500 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Filter;
