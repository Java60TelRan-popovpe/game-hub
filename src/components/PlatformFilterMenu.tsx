import { FC } from "react";
import FilterComponentProps from "../model/FilterComponentProps";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbMenu from "./GenericDumbMenu";
import ParentPlatform from "../model/ParentPlatform";

const PlatformFilterMenu: FC<FilterComponentProps> = ({
  selectedItem,
  onSelect,
  addShowAllItem,
}) => {
  return GenericSmartOptionFilter<ParentPlatform>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/platforms/lists/parents",
    optionName: "Platforms",
    Renderer: GenericDumbMenu
  });
};

export default PlatformFilterMenu