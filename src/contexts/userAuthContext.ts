import { create } from 'zustand';

export interface IUserState {
  id?: string | null;
  username: string | null;
  email: string | null;
  is_superuser: boolean | null;
  first_name: string | null;
  image: string | null;
}

export interface IUser {
  user: IUserState | null;
  setUser: (data: IUserState) => void;
}

export const useUserStore = create<IUser>()((set) => ({
  user: {
    email: null,
    first_name: null,
    username: null,
    image: null,
    is_superuser: null,
    id: null,
  },
  setUser: (data: IUserState) => set((state) => ({ user: data })),
}));

interface IToken {
  token: null | string;
  refresh: string;
  userId: string;
  setToken: (token: string) => void;
  setRefresh: (token: string) => void;
  setUserId: (id: string) => void;
}

export const useTokenStore = create<IToken>()((set) => ({
  token: localStorage.getItem('@ShibudoFinancesToken'),
  refresh: '',
  userId: '',
  setToken: (token: string | null) => set((state) => ({ token: token })),
  setRefresh: (token: string) => set((state) => ({ refresh: token })),
  setUserId: (id: string) => set((state) => ({ userId: id })),
}));
