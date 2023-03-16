import { create } from 'zustand';

interface IListUser {
  id: string;
  username: string;
}

interface IFinance {
  id: string;
  description: string;
  value: number;
  type: string;
  category: string;
}

interface IList {
  id?: string;
  name: string;
  month: string;
  year: number;
  user: IListUser;
}

interface IListStore {
  lists: IList[] | null;
  setLists: (list: IList[]) => void;
  shouldReload: boolean;
  setShouldReload: (condition: boolean) => void;
}

export const useListStore = create<IListStore>()((set) => ({
  lists: null,
  setLists: (list: IList[]) => set((state) => ({ lists: list })),
  shouldReload: false,
  setShouldReload: (condition: boolean) =>
    set((state) => ({ shouldReload: condition })),
}));
