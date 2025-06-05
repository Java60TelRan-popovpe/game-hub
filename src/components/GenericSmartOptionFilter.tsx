import { Spinner, Text } from "@chakra-ui/react";
import MenuItem from "../model/MenuItem";
import OptionFilterDumbComponentProps from "../model/OptionFilterDumbComponentProps";
import useSearchOption from "../hooks/useSearchOption";
import { GetOptionFilterFunction } from "../model/GetSearchOptionsFuncParam";


interface Props<T> {
  selectedItem: T | null;
  onSelect: (slug: T) => void;
  addShowAllItem: boolean;
  endpoint: string;
  optionName: string;
  Renderer: React.FC<OptionFilterDumbComponentProps<T>>;
  getMenuData: GetOptionFilterFunction
}

const GenericSmartOptionFilter = <T extends MenuItem>({
  selectedItem,
  onSelect,
  addShowAllItem,
  endpoint,
  optionName,
  Renderer,
  getMenuData
}: Props<T>) => {
  //const { data, error, isLoading } = useSearchOption<T>({source: "fetch", param: {addShowAllItem: String(addShowAllItem), apiEndPoint: endpoint }});
  const { data, error, isLoading } = getMenuData<T>({source: "fetch", param: {addShowAllItem: String(addShowAllItem), apiEndPoint: endpoint }});
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <Text color="red" fontSize={"2.5rem"}>
        {error}
      </Text>
    );
  }
  return (
    <Renderer
      items={data}
      onSelect={onSelect}
      selectedItem={selectedItem}
      optionName={optionName}
    />
  );
};

export default GenericSmartOptionFilter;

