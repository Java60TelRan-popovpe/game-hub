import { FC } from "react";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbMenu from "./GenericDumbMenu";
import ParentPlatform from "../model/ParentPlatform";
import useStore from "../data-managment/store";
import { groupOptions } from "../hooks/useData";

const PlatformFilterMenu: FC = () => {
  const selectedItem = useStore(s=>s.gameQuery.platform);
  const onSelect = useStore(s=>s.setPlatform);
   const createClearGenreItem = (): ParentPlatform => ({
      name: "All platforms",
      slug: "",
      id: undefined
   })
  return GenericSmartOptionFilter<ParentPlatform>({
    selectedItem,
    onSelect,
    optionName: "Platforms",
    Renderer: GenericDumbMenu,
     apiQueryOptions: () =>
          groupOptions<ParentPlatform>(
            "/platforms/lists/parents",
            selectedItem?.slug ? () => createClearGenreItem() : undefined
          ),
    //useMenuData: ()=>useSearchOption({source: "fetch", param: {addShowAllItem: String(Boolean(selectedItem?.slug)), apiEndPoint: "/platforms/lists/parents" }})
  });
};

export default PlatformFilterMenu