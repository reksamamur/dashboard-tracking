import { create } from 'zustand';

type SidebarStore = {
  open: boolean;
  setOpen: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  setOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}));
