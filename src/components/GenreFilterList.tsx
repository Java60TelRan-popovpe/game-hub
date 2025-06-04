import { FC } from "react";
import MenuItem from "../model/MenuItem";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbList from "./GenericDumbList";
import useStore from "../data-managment/store";

const GenreFilterList: FC = () => {
  const selectedItem = useStore(s=>s.gameQuery.genre);
  const onSelect = useStore(s=>s.setGenre);

  return GenericSmartOptionFilter<MenuItem>({
    selectedItem,
    onSelect,
    addShowAllItem: Boolean(selectedItem?.slug),
    endpoint: "/genres",
    optionName: "Genres",
    Renderer: GenericDumbList
  });
};

export default GenreFilterList