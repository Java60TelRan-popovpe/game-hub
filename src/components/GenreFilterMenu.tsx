import { FC } from "react";
import MenuItem from "../model/MenuItem";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbMenu from "./GenericDumbMenu";
import useStore from "../data-managment/store";
import { groupOptions } from "../hooks/useData";

const GenreFilterMenu: FC = () => {
  const selectedItem = useStore(s=>s.gameQuery.genre);
  const onSelect = useStore(s=>s.setGenre);
  return GenericSmartOptionFilter<MenuItem>({
    selectedItem,
    onSelect,
    optionName: "Genres",
    Renderer: GenericDumbMenu,
    apiQueryOptions: ()=>groupOptions("/genres", Boolean(selectedItem?.slug)),
  });
};

export default GenreFilterMenu