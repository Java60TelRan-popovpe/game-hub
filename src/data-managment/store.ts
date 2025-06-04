

import { SortOption } from "../components/SortSelector";
import GameQuery from "../model/GameQuery";
import MenuItem from "../model/MenuItem";
import ParentPlatform from "../model/ParentPlatform";
import {create} from 'zustand'

interface DataStore  {
    gameQuery: GameQuery;
    setGenre: (genre: MenuItem) => void;
    setPlatform: (platform: ParentPlatform) => void;
    setOrdering: (ordering: SortOption) => void;
    setSearchText: (searchText: string) => void;
}

const useStore = create<DataStore>((set)=>({
    gameQuery: {} as GameQuery,
    setGenre: (genre)=>set((state)=>({gameQuery: {...state.gameQuery, genre}})),
    setPlatform: (platform)=>set((state)=>({gameQuery: {...state.gameQuery, platform}})),
    setOrdering: (ordering)=>set((state)=>({gameQuery: {...state.gameQuery, ordering}})),
    setSearchText: (searchText)=>set((state)=>({gameQuery: {...state.gameQuery, searchText}}))
}));

export default useStore

