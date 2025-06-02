import { FC } from "react";
import FilterComponentProps from "../model/FilterComponentProps";
import GenericSmartList from "./GenericSmartList";
import MenuItem from "../model/MenuItem";

const GenreFilterComponent: FC<FilterComponentProps> = ({
  selectedItem,
  onSelect,
  addShowAllItem,
}) => {
  return GenericSmartList<MenuItem>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/genres",
    optionName: "Genres",
  });
};

export default GenreFilterComponent