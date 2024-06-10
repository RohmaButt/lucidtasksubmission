import create from "zustand";

const useFormulaStore = create((set) => ({
  formula: "",
  tags: [],
  parts: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (tagIndex) =>
    set((state) => ({
      tags: state.tags.filter((_, index) => index !== tagIndex),
    })),
  updateTag: (index, newContent) =>
    set((state) => ({
      tags: state.tags.map((tag, i) => (i === index ? newContent : tag)),
    })),
  setFormula: (formula) => set(() => ({ formula })),
  addPart: (part) => set((state) => ({ parts: [...state.parts, part] })),
}));

export default useFormulaStore;
