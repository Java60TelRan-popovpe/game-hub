import { FC } from "react";
import MenuItem from "../model/MenuItem";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbMenu from "./GenericDumbMenu";
import useStore from "../data-managment/store";
import useSearchOption from "../hooks/useSearchOption";

const GenreFilterMenu: FC = () => {
  const selectedItem = useStore(s=>s.gameQuery.genre);
  const onSelect = useStore(s=>s.setGenre);
  return GenericSmartOptionFilter<MenuItem>({
    selectedItem,
    onSelect,
    addShowAllItem: Boolean(selectedItem?.slug),
    endpoint: "/genres",
    optionName: "Genres",
    Renderer: GenericDumbMenu,
    getMenuData: useSearchOption
  });
};

export default GenreFilterMenu