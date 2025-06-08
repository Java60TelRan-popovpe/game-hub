import MenuItem from "../model/MenuItem";
const useMenuFromItemArray = function <T>({
  param: { array, nameProp, valueProp },
}: {
  param: { array: T[]; nameProp: keyof T; valueProp: keyof T };
}): { data: MenuItem[]; error: string; isLoading: boolean } {
  const resultingArray: MenuItem[] = array.map((item) => ({
    name: String(item[nameProp]),
    slug: String(item[valueProp]),
  }));

  return { data: resultingArray, error: "", isLoading: false };
};

export default useMenuFromItemArray;
