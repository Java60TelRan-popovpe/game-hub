import { Spinner, Text } from "@chakra-ui/react";
import MenuItem from "../model/MenuItem";
import { useSearchOption } from "../hooks/useSearchOption";
import OptionFilterDumbComponentProps from "../model/OptionFilterDumbComponentProps";


interface Props<T> {
  selectedItem: T | null;
  onSelect: (slug: T) => void;
  addShowAllItem: boolean;
  endpoint: string;
  optionName: string;
  Renderer: React.FC<OptionFilterDumbComponentProps<T>>
}

const GenericSmartOptionFilter = <T extends MenuItem>({
  selectedItem,
  onSelect,
  addShowAllItem,
  endpoint,
  optionName,
  Renderer
}: Props<T>) => {
  const { data, error, isLoading } = useSearchOption<T>(addShowAllItem, endpoint);
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

