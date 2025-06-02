import MenuItem from "../model/MenuItem";
import useData from "./useData";
import bg_img from "../assets/all_image.jpeg"

export function useSearchOption<T extends MenuItem >(addShowAllItem: boolean = false, apiEndPoint: string): {data: T[], error: string, isLoading: boolean} {
    const {data, error, isLoading} = useData<T>(apiEndPoint)
    const finalItemSet = [...data];
    if (addShowAllItem) {
        const showAllMenuItem = {"name" : "Show all", "slug": "", image_background: bg_img}; 
        finalItemSet.unshift(showAllMenuItem as T);
     }
     return { data: finalItemSet , error, isLoading }
    
}