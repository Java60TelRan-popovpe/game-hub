import {
  Text,
  List,
  HStack,
  Avatar,
  Button,
  Spinner,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { FC, useState } from "react";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MotionComponent from "./MotionComponent";
import ParentPlatform from "../model/ParentPlatform";
import { useSearchOption } from "../hooks/useSearchOption";
import MenuItem from "../model/MenuItem";


interface FilterOptionAsMenuProps<T> {
  selectedItem: T | null;
  items: T[];
  onSelect: (slug: T) => void;
  optionName: string;
}
const FilterOptionAsList = <T extends MenuItem>({
  selectedItem,
  items,
  onSelect,
}: FilterOptionAsMenuProps<T>) => {
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




interface MenuComponentProps {
  selectedItem: MenuItem | null;
  onSelect: (slug: MenuItem) => void;
  addShowAllItem: boolean;
}

const GenreMenu: FC<MenuComponentProps> = ({
  selectedItem,
  onSelect,
  addShowAllItem,
}) => {
  return GenericFilterMenu<MenuItem>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/genres",
    optionName: "Genres",
  });
};

const PlatformMenu: FC<MenuComponentProps> = ({
  selectedItem,
  onSelect,
  addShowAllItem,
}) => {
  return GenericFilterMenu<ParentPlatform>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/platforms/lists/parents",
    optionName: "Platforms",
  });
};
interface GenericMenuComponentProps<T> {
  selectedItem: T | null;
  onSelect: (slug: T) => void;
  addShowAllItem: boolean;
  endpoint: string;
  optionName: string;
}

const GenericFilterMenu = <T extends MenuItem>({
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

const GenreListComponent: FC<MenuComponentProps> = ({
  selectedItem,
  onSelect,
  addShowAllItem,
}) => {
  return GenericFilterList<MenuItem>({
    selectedItem,
    onSelect,
    addShowAllItem,
    endpoint: "/genres",
    optionName: "Genres",
  });
};

const GenericFilterList = <T extends MenuItem>({
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
    <FilterOptionAsList<T>
      items={data}
      onSelect={onSelect}
      selectedItem={selectedItem}
      optionName={optionName}
    />
  );
};

const FilterOptionAsMenu = <T extends MenuItem>({
  selectedItem,
  items,
  onSelect,
  optionName,
}: FilterOptionAsMenuProps<T>) => {
  const duration = 0.7;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Menu.Root onExitComplete={() => setIsOpen(false)}>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          marginBottom={3}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItem?.slug || optionName}
          {isOpen ? (
            <MotionComponent duration={duration}>
              <FaChevronUp></FaChevronUp>
            </MotionComponent>
          ) : (
            <FaChevronDown></FaChevronDown>
          )}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MotionComponent duration={duration}>
            <Menu.Content>
              {items.map((p) => (
                <Menu.Item
                  key={p.slug}
                  value={p.slug}
                  onClick={() => {
                    onSelect(p);
                    setIsOpen(false);
                  }}
                >
                  {p.name}
                </Menu.Item>
              ))}
            </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

function getSelectedStyls(
  slug: string,
  selectedGenre: string | null
): { fontWeight: string; color: string } {
  return slug === selectedGenre
    ? { fontWeight: "bold", color: "red" }
    : { fontWeight: "normal", color: "initial" };
}

export { GenreMenu, GenreListComponent, PlatformMenu };

