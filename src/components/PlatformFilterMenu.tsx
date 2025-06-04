import { FC } from "react";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbMenu from "./GenericDumbMenu";
import ParentPlatform from "../model/ParentPlatform";
import useStore from "../data-managment/store";

const PlatformFilterMenu: FC = () => {
  const selectedItem = useStore(s=>s.gameQuery.platform);
  const onSelect = useStore(s=>s.setPlatform);
  return GenericSmartOptionFilter<ParentPlatform>({
    selectedItem,
    onSelect,
    addShowAllItem: Boolean(selectedItem?.slug),
    endpoint: "/platforms/lists/parents",
    optionName: "Platforms",
    Renderer: GenericDumbMenu
  });
};

export default PlatformFilterMenu