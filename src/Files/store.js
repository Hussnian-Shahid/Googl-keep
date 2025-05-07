import { create } from "zustand";

export const useStore = create((set) => ({
  input: "",
  desc: "",
  // Fix the setter functions to properly accept parameters
  setInput: (input) => set({ input }),
  setDesc: (desc) => set({ desc }),
}));
