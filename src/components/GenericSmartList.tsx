import GenericMenuComponentProps from "../model/OptionFilterSmartComponentProps";
import GenericDumbList from "./GenericDumbList";
import { Spinner, Text } from "@chakra-ui/react";
import MenuItem from "../model/MenuItem";
import { useSearchOption } from "../hooks/useSearchOption";
const GenericSmartFilterList = <T extends MenuItem>({
  selectedItem,
  onSelect,
  addShowAllItem,
  endpoint,
  optionName,
}: GenericMenuComponentProps<T>) => {
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
    <GenericDumbList<T>
      items={data}
      onSelect={onSelect}
      selectedItem={selectedItem}
      optionName={optionName}
    />
  );
};

export default GenericSmartFilterList