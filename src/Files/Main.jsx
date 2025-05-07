import React, { useEffect, useState } from "react";
import { useStore } from "./store";
import { FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Main = () => {
  const input = useStore((state) => state.input); // Title of the note
  const desc = useStore((state) => state.desc); // Description of the note
  const setInput = useStore((state) => state.setInput); // Function to set title
  const setDesc = useStore((state) => state.setDesc); // Function to set desc

  // Local state to store all notes
  const [notes, setNotes] = useState([]);
  // State for search query
  const [search, setSearch] = useState("");
  // State for filtered notes
  const [filteredNotes, setFilteredNotes] = useState([]);
  // State for mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  // State for mobile search
  const [searchOpen, setSearchOpen] = useState(false);

  // Function that runs when the "Save" button is clicked
  const getData = () => {
    // Don't save empty notes
    if (!input && !desc) return;

    // Create a new note object
    const newNote = {
      id: Date.now(), // Unique ID using timestamp
      input, // Title
      desc, // Description
    };

    // Add the new note to the array using spread operator
    setNotes((prev) => [...prev, newNote]);

    // Clear the input fields after saving
    setInput("");
    setDesc("");
  };

  // delete functionality with animation
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Load notes when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes && savedNotes !== "undefined") {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  // Filter notes based on search input
  useEffect(() => {
    if (search) {
      const filtered = notes.filter((note) =>
        note.input.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [search, notes]);

  // Handle enter key press in search input
  const enterFunction = (e) => {
    if (e.key === "Enter") {
      findFunction();
    }
  };

  // Search functionality
  const findFunction = () => {
    // Search is already implemented through the useEffect above
    // This function can be used for additional search actions if needed
  };

  // Clear search
  const clearSearch = () => {
    setSearch("");
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle mobile search
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#202124]">
      {/* Header section */}
      <header className="w-full px-3 md:px-6 py-3 flex items-center justify-between text-white bg-[#202124] border-b border-white/20 sticky top-0 z-10">
        <div className="flex items-center">
          {/* menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="currentcolor"
                fillRule="evenodd"
                d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
              />
            </svg>
          </motion.button>

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center ml-3"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 md:w-10 md:h-10 mr-2"
            />
            <span className="font-custom text-lg md:text-xl hidden sm:block">
              Keep
            </span>
          </motion.div>
        </div>

        {/* Search bar - shown on desktop or when searchOpen is true on mobile */}
        <AnimatePresence>
          {(searchOpen || window.innerWidth > 768) && (
            <motion.div
              initial={{ opacity: 0, width: "0%" }}
              animate={{ opacity: 1, width: "50%" }}
              exit={{ opacity: 0, width: "0%" }}
              transition={{ duration: 0.3 }}
              className="rounded-xl relative mx-2 flex-1 max-w-xl hidden md:block"
            >
              <input
                type="text"
                placeholder="Search"
                className="bg-[#525355] text-white text-[17px] outline-0 rounded-md py-2 pl-10 pr-8 w-full transition-all duration-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={enterFunction}
              />
              {/* search icon */}
              <div className="absolute top-0 left-0 py-2 px-3 rounded-full">
                <FiSearch className="w-5 h-5 text-white" />
              </div>
              {/* close icon */}
              {search && (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 py-2 right-2 rounded-full cursor-pointer"
                  onClick={clearSearch}
                >
                  <FiX className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile search button */}
        <div className="flex items-center gap-3 md:gap-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 md:hidden"
          >
            <FiSearch className="w-5 h-5 text-white" />
          </motion.button>

          {/* Utility icons - shown on larger screens */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <img src="/refresh-arrow.png" className="w-5 h-5" alt="refresh" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <img src="/view.png" className="w-5 h-5" alt="view" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <img src="/setting.png" className="w-5 h-5" alt="settings" />
            </motion.button>
          </div>

          {/* User profile and apps - condensed on mobile */}
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <img src="/application.png" className="w-5 h-5" alt="apps" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <img src="/user.png" className="w-5 h-5" alt="user profile" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-20"
              onClick={toggleMenu}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-[#202124] border-r border-white/20 z-30 p-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="logo" className="w-8 h-8" />
                <span className="font-custom text-xl text-white">Keep</span>
              </div>

              <nav className="flex flex-col gap-2">
                <motion.a
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-white"
                  href="#"
                >
                  <img src="/refresh-arrow.png" className="w-5 h-5" alt="" />
                  <span>Refresh</span>
                </motion.a>
                <motion.a
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-white"
                  href="#"
                >
                  <img src="/view.png" className="w-5 h-5" alt="" />
                  <span>View</span>
                </motion.a>
                <motion.a
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-white"
                  href="#"
                >
                  <img src="/setting.png" className="w-5 h-5" alt="" />
                  <span>Settings</span>
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bg-[#303134] p-3 z-20 md:hidden"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#525355] text-white text-base outline-0 rounded-md py-2 pl-10 pr-10 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={enterFunction}
                autoFocus
              />
              <div className="absolute top-0 left-0 py-2 px-3 rounded-full">
                <FiSearch className="w-5 h-5 text-white" />
              </div>
              {search && (
                <button
                  className="absolute top-0 right-8 py-2 px-2 rounded-full"
                  onClick={clearSearch}
                >
                  <FiX className="w-5 h-5 text-white" />
                </button>
              )}
              <button
                className="absolute top-0 right-0 py-2 px-2 rounded-full"
                onClick={toggleSearch}
              >
                <FiX className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 bg-[#202124] w-full flex flex-col items-center px-4 py-6 md:py-8">
        {/* Note Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl mb-8"
        >
          <motion.div
            whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.3)", y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[#303134] border border-white/10 rounded-xl shadow-lg p-4 md:p-6 transition-all duration-200"
          >
            {/* Input field for the title */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Title"
              className="w-full bg-transparent text-white text-lg md:text-xl font-semibold outline-none mb-3 placeholder-white/70"
            />

            {/* Textarea for the note description */}
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="2"
              placeholder="Take a note..."
              className="w-full bg-transparent text-white text-sm md:text-base outline-none resize-none placeholder-white/60 mb-4 md:mb-6"
            />

            {/* Save Button */}
            <div className="flex justify-end items-center">
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={getData}
                className="bg-white/10 cursor-pointer text-white text-sm px-4 py-1.5 rounded-md transition-colors duration-200"
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Notes Display Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 w-full max-w-7xl">
          <AnimatePresence>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  layout
                  className="bg-[#303134] border border-white/10 rounded-lg p-4 text-white transition-all duration-200 relative group"
                >
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 break-words">
                    {note.input}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 break-words mb-8">{note.desc}</p>

                  {/* Action Icons: Edit and Delete - Now at bottom left and visible on hover */}
                  <div className="absolute bottom-3 right-3  opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    {/* Edit button */}
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#60a5fa" }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit"
                      onClick={() => {
                        setInput(note.input);
                        setDesc(note.desc);
                        deleteNote(note.id);
                      }}
                      className="p-1.5 rounded-full cursor-pointer hover:bg-blue-500/20 transition-colors duration-200"
                    >
                      <FiEdit2 size={18} />
                    </motion.button>

                    {/* Delete button */}
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete"
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-full cursor-pointer hover:bg-red-500/20 transition-colors duration-200"
                    >
                      <FiTrash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-white text-lg py-12"
              >
                No matching results
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Main;
