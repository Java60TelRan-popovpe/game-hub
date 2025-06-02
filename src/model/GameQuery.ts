import { SortOption } from "../components/SortSelector";
import MenuItem from "./MenuItem";
import ParentPlatform from "./ParentPlatform";

export default interface GameQuery {
    genre: MenuItem | null;
    platform: ParentPlatform | null;
    ordering: SortOption | null;
    searchText: string | null
}