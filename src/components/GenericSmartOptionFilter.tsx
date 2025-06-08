import { Spinner, Text } from "@chakra-ui/react";
import MenuItem from "../model/MenuItem";
import OptionFilterDumbComponentProps from "../model/OptionFilterDumbComponentProps";


interface Props<T> {
  selectedItem: T | null;
  onSelect: (slug: T) => void;
  optionName: string;
  Renderer: React.FC<OptionFilterDumbComponentProps<T>>;
  useMenuData: ()=>{data: T[], error: string, isLoading: boolean}
}

const GenericSmartOptionFilter = <T extends MenuItem>({
  selectedItem,
  onSelect,
  optionName,
  Renderer,
  useMenuData
}: Props<T>) => {
  const { data, error, isLoading } = useMenuData();
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

