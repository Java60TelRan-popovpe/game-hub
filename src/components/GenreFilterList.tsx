import { FC } from "react";
import MenuItem from "../model/MenuItem";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbList from "./GenericDumbList";
import useStore from "../data-managment/store";
import useSearchOption from "../hooks/useSearchOption";

const GenreFilterList: FC = () => {
  const selectedItem = useStore(s=>s.gameQuery.genre);
  const onSelect = useStore(s=>s.setGenre);
  return GenericSmartOptionFilter<MenuItem>({
    selectedItem,
    onSelect,
    optionName: "Genres",
    Renderer: GenericDumbList,
    useMenuData: () => useSearchOption({source: "fetch", param: {addShowAllItem: String(Boolean(selectedItem?.slug)), apiEndPoint: "/genres" }})
  });
};

export default GenreFilterList