import { Spinner, Text } from "@chakra-ui/react";
import MenuItem from "../model/MenuItem";
import FilterOptionAsMenu from "./GenericDumbMenu";
import GenericMenuComponentProps from "../model/OptionFilterSmartComponentProps";
import { useSearchOption } from "../hooks/useSearchOption";

const GenericSmartFilterMenu = <T extends MenuItem>({
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
    <FilterOptionAsMenu<T>
      items={data}
      onSelect={onSelect}
      selectedItem={selectedItem}
      optionName={optionName}
    />
  );
};

export default GenericSmartFilterMenu