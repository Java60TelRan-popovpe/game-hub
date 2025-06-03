import { FC } from "react";
import FilterComponentProps from "../model/FilterComponentProps";
import MenuItem from "../model/MenuItem";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbList from "./GenericDumbList";

const GenreFilterList: FC<FilterComponentProps> = ({
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
    Renderer: GenericDumbList
  });
};

export default GenreFilterList