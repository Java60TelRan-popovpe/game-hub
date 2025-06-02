import { FC } from "react";
import FilterComponentProps from "../model/FilterComponentProps";
import GenericSmartMenu from "./GenericSmartMenu";
import MenuItem from "../model/MenuItem";

const GenreFilterMenu: FC<FilterComponentProps> = ({
  selectedItem,
  onSelect,
  addShowAllItem,
}) => {
  return GenericSmartMenu<MenuItem>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/genres",
    optionName: "Genres",
  });
};

export default GenreFilterMenu