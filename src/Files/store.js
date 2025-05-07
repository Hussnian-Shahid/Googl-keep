import { create } from "zustand";

export const useStore = create((set) => ({
  // Note content state
  input: "",
  desc: "",
  // Added category state
  category: "Personal",

  // State setters
  setInput: (input) => set({ input }),
  setDesc: (desc) => set({ desc }),
  setCategory: (category) => set({ category }),

  // Reset all fields
  resetFields: () => set({ input: "", desc: "", category: "Personal" }),
}));
