import { List, HStack, Avatar, Button } from "@chakra-ui/react";

import MenuItem from "../model/MenuItem";
import OptionFilterDumbComponentProps from "../model/OptionFilterDumbComponentProps";
function getSelectedStyls(
  slug: string,
  selectedGenre: string | null
): { fontWeight: string; color: string } {
  return slug === selectedGenre
    ? { fontWeight: "bold", color: "red" }
    : { fontWeight: "normal", color: "initial" };
}
const GenericDumbList = <T extends MenuItem>({
  selectedItem,
  items,
  onSelect,
}: OptionFilterDumbComponentProps<T>) => {
  return (
    <List.Root listStyle="none" maxHeight="85vh" overflow="auto">
      {items.map((g) => (
        <List.Item key={g.slug}>
          <HStack padding={2}>
            <Avatar.Root shape="rounded" size="lg">
              <Avatar.Fallback name={g.name} />
              <Avatar.Image src={g.image_background} />
            </Avatar.Root>
            <Button
              {...getSelectedStyls(g.slug, selectedItem?.slug || null)}
              variant={"outline"}
              borderWidth="0"
              fontSize={"1.1rem"}
              paddingX="1"
              onClick={() => onSelect(g)}
            >
              {g.name}
            </Button>
          </HStack>
        </List.Item>
      ))}
    </List.Root>
  );
};

export default GenericDumbList;
