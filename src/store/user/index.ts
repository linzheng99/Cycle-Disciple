import { create } from 'zustand';

interface IUser {
  id: number
  name: string
  weight?: number
  city?: string
  country?: string
}

interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

