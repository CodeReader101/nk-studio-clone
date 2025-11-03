import { create } from "zustand";

const useStore = create((set) => ({
  mountainScene: false,
  toggle: () => set((state) => ({ mountainScene: !state.mountainScene })),
  setMountainScene: (value) => set({ mountainScene: value }),

  scrollProgress: 0,
  // setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
}));

export default useStore;
