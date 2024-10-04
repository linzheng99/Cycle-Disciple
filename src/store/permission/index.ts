import { create } from 'zustand';

interface IPermission {
  lastBuildTime: number
  setLastBuildTime: () => void
  refreshLastBuildTime: () => void
}

export const usePermissionStore = create<IPermission>((set) => ({
  lastBuildTime: 0,
  setLastBuildTime: () => set({ lastBuildTime: Date.now() }),
  refreshLastBuildTime: () => set({ lastBuildTime: 0 }),
}));

