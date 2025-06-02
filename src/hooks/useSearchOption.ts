import MenuItem from "../model/MenuItem";
import useData from "./useData";

export function useSearchOption<T extends MenuItem >(addShowAllItem: boolean = false, apiEndPoint: string): {data: T[], error: string, isLoading: boolean} {
    const {data, error, isLoading} = useData<T>(apiEndPoint)
    const finalItemSet = [...data];
    if (addShowAllItem) {
        const showAllMenuItem: MenuItem = ({"name" : "Show all", "slug": ""}); 
        finalItemSet.unshift(showAllMenuItem as T);
     }
     return { data: finalItemSet , error, isLoading }
    
}