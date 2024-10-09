import { create } from 'zustand';

import type { IStravaUser, IUser } from '~/types';


interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));


export function buildUserInfo(athlete: IStravaUser): IUser {
  return {
    id: athlete.id,
    name: `${athlete.firstname  } ${  athlete.lastname}`,
    weight: athlete.weight,
    city: athlete.city,
    country: athlete.country,
  }
}
