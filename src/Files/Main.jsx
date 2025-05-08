import React, { useEffect, useState } from "react";
import { useStore } from "./store";
import { FiEdit2, FiTrash2, FiSearch, FiX, FiTag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Editnote from "./Editnote";
import ViewNote from "./ViewNote";
import Filter from "./Filter";
import {
  MdMenu,
  MdSearch,
  MdRefresh,
  MdViewAgenda,
  MdSettings,
  MdApps,
  MdAccountCircle,
  MdClose,
  MdPalette,
  MdImage,
  MdVideocam,
  MdOutlineDeleteOutline,
  MdOutlineCloudDone,
} from "react-icons/md";

const Main = () => {
  const input = useStore((state) => state.input); // Title of the note
  const desc = useStore((state) => state.desc); // Description of the note
  const category = useStore((state) => state.category); // Category of the note
  const setInput = useStore((state) => state.setInput); // Function to set title
  const setDesc = useStore((state) => state.setDesc); // Function to set desc
  const setCategory = useStore((state) => state.setCategory); // Function to set category
  const resetFields = useStore((state) => state.resetFields); // Function to reset fields

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
  // Default categories
  const [categories, setCategories] = useState(["Personal", "Business"]);
  // Active category filter
  const [activeCategory, setActiveCategory] = useState("all");
  // Color picker state for new note
  const [selectedColor, setSelectedColor] = useState("#303134");
  // Background pattern
  const [backgroundPattern, setBackgroundPattern] = useState("default");
  // Image/video attachment states
  const [imageAttachment, setImageAttachment] = useState(null);
  const [videoAttachment, setVideoAttachment] = useState(null);
  // Preview states
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // Background patterns
  const backgroundPatterns = {
    default: "bg-[#202124]",
    dots: "bg-[#202124] bg-dots",
    grid: "bg-[#202124] bg-grid",
    waves: "bg-[#202124] bg-waves",
    circuit: "bg-[#202124] bg-circuit",
  };

  // Available colors for notes
  const colorOptions = [
    "#303134", // Default dark
    "#3C1E1F", // Dark red
    "#3D2E27", // Dark brown
    "#2E3831", // Dark green
    "#1E2D3C", // Dark blue
    "#2B243B", // Dark purple
    "#3C3930", // Dark yellow
    "#32323C", // Dark blue-gray
  ];

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageAttachment(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoAttachment(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove image attachment
  const removeImageAttachment = () => {
    setImageAttachment(null);
    setImagePreview(null);
  };

  // Function to remove video attachment
  const removeVideoAttachment = () => {
    setVideoAttachment(null);
    setVideoPreview(null);
  };

  // Function that runs when the "Save" button is clicked
  const getData = () => {
    // Don't save empty notes
    if (!input && !desc && !imagePreview && !videoPreview) return;

    // Create a new note object
    const newNote = {
      id: Date.now(), // Unique ID using timestamp
      input, // Title
      desc, // Description
      category, // Category
      color: selectedColor, // Background color
      image: imagePreview, // Image attachment
      video: videoPreview, // Video attachment
    };

    // Add the new note to the array using spread operator
    setNotes((prev) => [...prev, newNote]);

    // Clear the input fields after saving
    resetFields();
    removeImageAttachment();
    removeVideoAttachment();
    // Reset color to default after saving
    setSelectedColor("#303134");
  };

  // Handle color selection - directly changes the color
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Handle background pattern selection
  const handlePatternSelect = (pattern) => {
    setBackgroundPattern(pattern);
    localStorage.setItem("backgroundPattern", pattern);
  };

  // Add new category
  const addNewCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // delete functionality with animation
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Load notes, categories, and background pattern when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedCategories = localStorage.getItem("categories");
    const savedPattern = localStorage.getItem("backgroundPattern");

    if (savedNotes && savedNotes !== "undefined") {
      setNotes(JSON.parse(savedNotes));
    }

    if (savedCategories && savedCategories !== "undefined") {
      setCategories(JSON.parse(savedCategories));
    }

    if (savedPattern) {
      setBackgroundPattern(savedPattern);
    }
  }, []);

  // Save notes and categories whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }

    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [notes, categories]);

  // Filter notes based on search input and active category
  useEffect(() => {
    let filtered = notes;

    // Filter by category first if not on "all"
    if (activeCategory !== "all") {
      filtered = filtered.filter((note) => note.category === activeCategory);
    }

    // Then filter by search term if one exists
    if (search) {
      filtered = filtered.filter((note) =>
        note.input.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredNotes(filtered);
  }, [search, notes, activeCategory]);

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

  // popm up form
  const [editModalOpen, setEditfoam] = useState(false);
  const [editingNote, setEditingnote] = useState(null);

  const handleEditNote = (note) => {
    setEditingnote(note);
    setEditfoam(true);
  };

  const updateNote = () => {
    const updateNotes = notes.map((note) =>
      note.id === editingNote.id ? editingNote : note
    );

    setNotes(updateNotes);
    setEditfoam(false);
    setEditingnote(null);
  };

  const cancelEdit = () => {
    setEditfoam(false);
    setEditingnote(null);
  };

  // Add this new state for the view modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState(null);

  // Function to handle opening the view modal
  const handleViewNote = (note) => {
    setViewingNote(note);
    setViewModalOpen(true);
  };

  // Function to close the view modal
  const closeView = () => {
    setViewModalOpen(false);
    setViewingNote(null);
  };

  // Background patterns menu
  const [patternMenuVisible, setPatternMenuVisible] = useState(false);

  // Toggle background pattern menu
  const togglePatternMenu = () => {
    setPatternMenuVisible(!patternMenuVisible);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${backgroundPatterns[backgroundPattern]}`}
    >
      {/* Background effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>

      {/* Header section */}
      <header className="w-full px-3 md:px-6 py-3 flex items-center justify-between text-white bg-[#202124]/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="flex items-center">
          {/* menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <MdMenu className="w-6 h-6" />
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

        {/* Search bar */}
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
                <MdSearch className="w-5 h-5" />
              </div>
              {/* close icon */}
              {search && (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 py-2 right-2 rounded-full cursor-pointer"
                  onClick={clearSearch}
                >
                  <MdClose className="w-5 h-5" />
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
            <MdSearch className="w-6 h-6" />
          </motion.button>

          {/* Utility icons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <MdRefresh className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              onClick={togglePatternMenu}
            >
              <MdViewAgenda className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <MdSettings className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Background pattern menu */}
          <AnimatePresence>
            {patternMenuVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-24 top-16 p-4 bg-[#303134] rounded-lg shadow-xl z-20"
              >
                <h3 className="text-white text-sm font-medium mb-3">
                  Background Pattern
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(backgroundPatterns).map((pattern) => (
                    <motion.button
                      key={pattern}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handlePatternSelect(pattern);
                        togglePatternMenu();
                      }}
                      className={`px-3 py-2 rounded-md text-white text-sm capitalize ${
                        backgroundPattern === pattern
                          ? "bg-blue-500/30 border border-blue-500/50"
                          : "bg-[#525355] border border-transparent"
                      }`}
                    >
                      {pattern}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* User profile and apps */}
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <MdApps className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <MdAccountCircle className="w-6 h-6" />
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

                {/* Background pattern selector in sidebar */}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <h3 className="text-white text-sm font-medium px-4 mb-2">
                    Background Pattern
                  </h3>
                  <div className="flex flex-col gap-2">
                    {Object.keys(backgroundPatterns).map((pattern) => (
                      <motion.button
                        key={pattern}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                        onClick={() => handlePatternSelect(pattern)}
                        className={`flex items-center gap-3 py-2 px-4 rounded-lg text-white text-sm capitalize ${
                          backgroundPattern === pattern ? "bg-blue-500/30" : ""
                        }`}
                      >
                        <span>{pattern}</span>
                        {backgroundPattern === pattern && (
                          <span className="ml-auto">✓</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
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
      <main className="flex-1 w-full flex flex-col items-center px-4 py-6 md:py-8 relative">
        {/* Category Filter Section */}
        <div className="w-full max-w-xl mb-4">
          <Filter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            addNewCategory={addNewCategory}
          />
        </div>

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
            style={{ backgroundColor: selectedColor }}
            className="border border-white/10 rounded-xl shadow-lg p-4 md:p-6 transition-all duration-200"
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

            {/* Media attachments preview */}
            <div className="flex flex-col gap-4 mb-4">
              {/* Image preview */}
              {imagePreview && (
                <div className="relative group rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Attachment"
                    className="w-full h-auto max-h-64 object-contain bg-black/20 rounded-lg"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={removeImageAttachment}
                      className="p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                      <MdOutlineDeleteOutline className="text-white w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Video preview */}
              {videoPreview && (
                <div className="relative group rounded-lg overflow-hidden">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-auto max-h-64 object-contain bg-black/20 rounded-lg"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={removeVideoAttachment}
                      className="p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                      <MdOutlineDeleteOutline className="text-white w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection and Buttons Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#525355] cursor-pointer text-white text-sm px-3 py-1.5 rounded-md outline-none appearance-none pr-8"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiTag className="text-white/70 w-4 h-4" />
                  </div>
                </div>

                {/* New Color Picker - Direct circles */}
                <div className="flex items-center gap-1 ml-1">
                  {colorOptions.map((color) => (
                    <motion.div
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleColorChange(color)}
                      style={{ backgroundColor: color }}
                      className={`w-5 h-5 rounded-full cursor-pointer transition-all ${
                        selectedColor === color ? "ring-1 ring-white scale-125" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Media upload buttons and Save Button */}
              <div className="flex items-center gap-2">
                {/* Image upload button - direct */}
                <label className="cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#525355] text-white p-1.5 rounded-md flex items-center justify-center"
                  >
                    <MdImage className="w-5 h-5" />
                  </motion.div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                {/* Video upload button - direct */}
                <label className="cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#525355] text-white p-1.5 rounded-md flex items-center justify-center"
                  >
                    <MdVideocam className="w-5 h-5" />
                  </motion.div>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </label>

                {/* Save Button */}
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={getData}
                  className="bg-white/10 cursor-pointer text-white text-sm px-4 py-1.5 rounded-md transition-colors duration-200 flex items-center gap-2 ml-2"
                >
                  <MdOutlineCloudDone className="w-4 h-4" />
                  <span>Save</span>
                </motion.button>
              </div>
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
                  onClick={() => handleViewNote(note)}
                  style={{ backgroundColor: note.color || "#303134" }}
                  className="border border-white/10 rounded-lg p-4 text-white transition-all duration-200 relative group"
                >
                  {/* Category Badge - Top Left */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/10 rounded-full text-xs font-medium">
                    {note.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 mt-6 break-words">
                    {note.input}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 break-words mb-4 line-clamp-2 overflow-hidden">
                    {note.desc}
                  </p>

                  {/* Media indicators */}
                  {(note.image || note.video) && (
                    <div className="flex gap-2 mb-4">
                      {note.image && (
                        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                          <MdImage className="w-3 h-3" />
                          <span className="text-xs">Image</span>
                        </div>
                      )}
                      {note.video && (
                        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                          <MdVideocam className="w-3 h-3" />
                          <span className="text-xs">Video</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Image preview (small thumbnail) */}
                  {note.image && (
                    <div className="mb-4 rounded-md overflow-hidden bg-black/20">
                      <img
                        src={note.image}
                        alt="Note attachment"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  )}

                  {/* Video preview (thumbnail) */}
                  {note.video && (
                    <div className="mb-4 rounded-md overflow-hidden bg-black/20 relative">
                      <video
                        src={note.video}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                          <MdVideocam className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Icons: Edit and Delete */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    {/* Edit button */}
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#60a5fa" }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation(); // Stop the click from triggering the parent note's click
                        handleEditNote(note);
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
                      onClick={(e) => {
                        e.stopPropagation(); // Stop the click from triggering the parent note's click
                        deleteNote(note.id);
                      }}
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
          <Editnote
            editModalOpen={editModalOpen}
            editingNote={editingNote}
            cancelEdit={cancelEdit}
            updateNote={updateNote}
            setEditingnote={setEditingnote}
            categories={categories}
            colorOptions={colorOptions}
          />
          <ViewNote
            viewModalOpen={viewModalOpen}
            viewingNote={viewingNote}
            closeView={closeView}
          />
        </div>
      </main>

      {/* Dynamic background components */}
      {backgroundPattern === "dots" && (
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
      )}

      {backgroundPattern === "grid" && (
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
      )}

      {backgroundPattern === "waves" && (
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.652-1.715 2.77-2.914 3.145-3.38.245-.3.46-.577.643-.846l.123.095c.145-.15.293-.245.445-.33.73-.5 1.46.2 2.18.756v1.5c-.667-.3-1.33-.576-2-.755a5.415 5.415 0 0 0-.46.225c-.5.233-.144.45-.237.665a7.122 7.122 0 0 1-.567.9c-.677 1.07-1.353 1.472-1.755 1.473h-.88c-.4 0-1.074-.402-1.75-1.473-.235-.424-.383-.73-.513-.998l.146.095c-.632-.726-1.487-1.39-2.486-2-.417-.202-.72-.045-.554.337.167.382.676 1.77.676 1.77s.576.95 1.074-.1c.498-1.052.186-1.462.13-1.828z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: "100px 20px",
            }}
          ></div>
        </div>
      )}

      {backgroundPattern === "circuit" && (
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23ffffff' fill-opacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h-2.07a3 3 0 1 0-5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.172l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.513L175.586 80H224V21.9a5 5 0 1 1 2 0V82h-49.586L146 112.414V188H53.9a5 5 0 1 1 0-2H144v-65.414l-32 32V188h-57.1zm-63.1-1a5 5 0 1 1 0-2H7v-94h-3v96h-2v-98h2v-53.513L80 53.087V18.087z'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Main;
