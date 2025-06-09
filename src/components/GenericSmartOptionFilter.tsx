import { Spinner, Text } from "@chakra-ui/react";
import MenuItem from "../model/MenuItem";
import OptionFilterDumbComponentProps from "../model/OptionFilterDumbComponentProps";
import { useQuery, UseQueryOptions }  from '@tanstack/react-query'
import {  } from '@tanstack/react-query';
type GroupOptionsReturn<T extends MenuItem> = UseQueryOptions<T[], Error, T[], [string]>

interface Props<T extends MenuItem> {
  selectedItem: T | null;
  onSelect: (slug: T) => void;
  optionName: string;
  Renderer: React.FC<OptionFilterDumbComponentProps<T>>;
  apiQueryOptions: ()=>GroupOptionsReturn<T>;
}

const GenericSmartOptionFilter = <T extends MenuItem>({
  selectedItem,
  onSelect,
  optionName,
  Renderer,
  apiQueryOptions,
}: Props<T>) => {

  const { data, error, isLoading } = useQuery(apiQueryOptions());
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <Text color="red" fontSize={"2.5rem"}>
        {error.message}
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

