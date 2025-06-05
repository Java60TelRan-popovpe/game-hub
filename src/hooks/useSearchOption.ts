import MenuItem from "../model/MenuItem";
import useData from "./useData";
import bg_img from "../assets/all_image.jpeg"
import { GetOptionFilterFunction, GetSearchOptionsFuncParam } from "../model/GetSearchOptionsFuncParam";
const useSearchOption: GetOptionFilterFunction = function<T extends MenuItem >({param:{addShowAllItem, apiEndPoint}}: GetSearchOptionsFuncParam) {
   
    const {data, error, isLoading} = useData<T>(apiEndPoint)
    const finalItemSet = [...data];
    if (addShowAllItem === "true") {
        const showAllMenuItem = {"name" : "Clear", "slug": "", image_background: bg_img}; 
        finalItemSet.unshift(showAllMenuItem as T);
     }
     return { data: finalItemSet , error, isLoading }
    
}

export default useSearchOption