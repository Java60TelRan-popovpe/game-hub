import { Genre } from "../model/fetch-genre-types";
import useData from "./useData";
import all_image from "../assets/all_image.jpeg"

export default function useGenre(addShowAllItem: boolean = false): {data: Genre[], error: string, isLoading: boolean} {
    const {data, error, isLoading} = useData<Genre>("/genres")
    const finalItemSet = [...data];
    if (addShowAllItem) {
        finalItemSet.unshift({
            name: "All genres",
            slug: "",
            image_background: all_image
          })
     }
     return { data: finalItemSet , error, isLoading }
    
}