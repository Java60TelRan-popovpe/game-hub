import { FC } from "react";
import FilterComponentProps from "../model/FilterComponentProps";
import ParentPlatform from "../model/ParentPlatform";
import GenericSmartFilterMenu from "./GenericSmartMenu";

const PlatformFilterMenu: FC<FilterComponentProps> = ({selectedItem,onSelect,addShowAllItem}) => {
  return GenericSmartFilterMenu<ParentPlatform>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/platforms/lists/parents",
    optionName: "Platforms",
  });
};

export default PlatformFilterMenu
