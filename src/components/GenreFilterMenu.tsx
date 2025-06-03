import { FC } from "react";
import FilterComponentProps from "../model/FilterComponentProps";
import MenuItem from "../model/MenuItem";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbMenu from "./GenericDumbMenu";

const GenreFilterMenu: FC<FilterComponentProps> = ({
  selectedItem,
  onSelect,
  addShowAllItem,
}) => {
  return GenericSmartOptionFilter<MenuItem>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/genres",
    optionName: "Genres",
    Renderer: GenericDumbMenu
  });
};

export default GenreFilterMenu