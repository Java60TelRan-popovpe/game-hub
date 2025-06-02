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
import useGenre from "../hooks/useGenre";
import { FC, useState } from "react";
import { Genre } from "../model/fetch-genre-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MotionComponent from "./MotionComponent";
import ParentPlatform from "../model/ParentPlatform";
import { useSearchOption } from "../hooks/useSearchOption";
import MenuItem from "../model/MenuItem";

interface GenreListProps {
  selectedGenre: string | null;
  genres: Genre[];
  onSelectGenre: (genre: string) => void;
}
const GenreAsList: FC<GenreListProps> = ({
  selectedGenre,
  genres,
  onSelectGenre,
}) => {
  return (
    <List.Root listStyle="none" maxHeight="85vh" overflow="auto">
      {genres.map((g) => (
        <List.Item key={g.slug}>
          <HStack padding={2}>
            <Avatar.Root shape="rounded" size="lg">
              <Avatar.Fallback name={g.name} />
              <Avatar.Image src={g.image_background} />
            </Avatar.Root>
            <Button
              {...getSelectedStyls(g.slug, selectedGenre)}
              variant={"outline"}
              borderWidth="0"
              fontSize={"1.1rem"}
              paddingX="1"
              onClick={() => onSelectGenre(g.slug)}
            >
              {g.name}
            </Button>
          </HStack>
        </List.Item>
      ))}
    </List.Root>
  );
};

const FilterOptionAsList = <T extends MenuItem & {image_background: string}>({
  selectedItem,
  items,
  onSelect
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
              onClick={() => onSelect(g.slug)}
            >
              {g.name}
            </Button>
          </HStack>
        </List.Item>
      ))}
    </List.Root>
  );
};

interface FilterOptionAsMenuProps<T> {
  selectedItem: T | null;
  items: T[];
  onSelect: (slug: string) => void;
  optionName: string;
}
interface GenericMenuComponentProps<T> {
  selectedItem: T | null;
  onSelect: (slug: string) => void;
  addShowAllItem: boolean;
  endpoint: string;
  optionName: string;

}

interface MenuComponentProps {
  selectedItem: MenuItem | null;
  onSelect: (slug: string) => void;
  addShowAllItem: boolean;
}

const GenreMenu: FC<MenuComponentProps> = ({selectedItem, onSelect, addShowAllItem}) => {
  return GenericFilterMenu<MenuItem>({selectedItem, onSelect, addShowAllItem, endpoint: "/genres", optionName:"Genres"})
}

const GenericFilterMenu  = <T extends MenuItem>({selectedItem, onSelect, addShowAllItem, endpoint, optionName}: GenericMenuComponentProps<T>) => {
  const {data, error, isLoading} = useSearchOption<T>(addShowAllItem, endpoint)
  return (
    <>
    {isLoading && <Spinner></Spinner>}
    {error ? (
      <Text color="red" fontSize={"2.5rem"}>
        {error}
      </Text>
    ) : (
      <FilterOptionAsMenu<T>
        items={data}
        onSelect={onSelect}
        selectedItem={selectedItem}
        optionName={optionName}
      />
    )}
  </>
  )
}

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
          {selectedItem?.name || optionName}
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
                    onSelect(p.slug);
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


const GenreAsMenu: FC<GenreListProps> = ({
  selectedGenre,
  genres,
  onSelectGenre,
}) => {
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
          {selectedGenre || "Genres"}
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
              {genres.map((p) => (
                <Menu.Item
                  key={p.slug}
                  value={p.slug}
                  onClick={() => {
                    onSelectGenre(p.slug);
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
export type GenreComponentVariants = keyof typeof GanreRenderVariants;

function getSelectedStyls(
  slug: string,
  selectedGenre: string | null
): { fontWeight: string; color: string } {
  return slug === selectedGenre
    ? { fontWeight: "bold", color: "red" }
    : { fontWeight: "normal", color: "initial" };
}
const GanreRenderVariants = {
  list: GenreAsList,
  menu: GenreAsMenu,
};



interface Props {
  onSelectGenre: (genreSlug: string) => void;
  selectedGenre: string | null;
  componentType: GenreComponentVariants;
  addShowAllItem: boolean;
}
const GenreList: FC<Props> = ({
  onSelectGenre,
  selectedGenre,
  componentType,
  addShowAllItem,
}) => {
  const ComponentToRender = GanreRenderVariants[componentType];
  const { data, error, isLoading } = useGenre(addShowAllItem);
  return (
    <>
      {isLoading && <Spinner></Spinner>}
      {error ? (
        <Text color="red" fontSize={"2.5rem"}>
          {error}
        </Text>
      ) : (
        <ComponentToRender
          genres={data}
          onSelectGenre={onSelectGenre}
          selectedGenre={selectedGenre}
        />
      )}
    </>
  );
};

export default GenreList;
export {GenreMenu};
