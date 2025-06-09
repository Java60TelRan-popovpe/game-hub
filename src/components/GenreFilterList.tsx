import { FC } from "react";
import MenuItem from "../model/MenuItem";
import GenericSmartOptionFilter from "./GenericSmartOptionFilter";
import GenericDumbList from "./GenericDumbList";
import useStore from "../data-managment/store";
import { groupOptions } from "../hooks/useData";
import img_bg from "../assets/all_image.jpeg";

const GenreFilterList: FC = () => {
  const selectedItem = useStore((s) => s.gameQuery.genre);
  const onSelect = useStore((s) => s.setGenre);
  const createClearGenreItem = (): MenuItem => ({
    name: "Clear",
    slug: "",
    image_background: img_bg,
  });
  return GenericSmartOptionFilter<MenuItem>({
    selectedItem,
    onSelect,
    optionName: "Genres",
    Renderer: GenericDumbList,
    apiQueryOptions: () =>
      groupOptions<MenuItem>(
        "/genres",
        selectedItem?.slug ? () => createClearGenreItem() : undefined
      ),
  });
};

export default GenreFilterList;
