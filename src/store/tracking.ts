import { create } from 'zustand';

type TrackingStore = {
  doRefetch: boolean;
  loading: boolean;
  setDoRefetch: (doFetch: boolean) => void;
  setLoading: (load: boolean) => void;
};

export const useTrackingStore = create<TrackingStore>((set) => ({
  doRefetch: false,
  loading: false,
  setDoRefetch: (doFetch: boolean) =>
    set({
      doRefetch: doFetch,
    }),
  setLoading: (load: boolean) =>
    set({
      loading: load,
    }),
}));
