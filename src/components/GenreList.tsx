import { Text, List, HStack, Avatar, Button, Spinner, Menu, Portal } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import { FC, useState } from "react";
import { Genre } from "../model/fetch-genre-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MotionComponent from "./MotionComponent";

interface GenreListProps {
  selectedGenre: string | null;
  genres: Genre[];
  onSelectGenre: (genre: string)=>void;
}
const GenreAsList: FC<GenreListProps> = ({selectedGenre, genres, onSelectGenre}) => {
  return (
    <List.Root listStyle="none" maxHeight="85vh" overflow="auto">
      {genres.map((g) => (
        <List.Item key={g.id}>
          <HStack padding={2}>
            <Avatar.Root shape="rounded" size="lg">
              <Avatar.Fallback name={g.name} />
              <Avatar.Image src={g.image_background}/>
            </Avatar.Root>
            <Button {...getSelectedStyls(g.slug, selectedGenre)} variant={"outline"} borderWidth="0" fontSize={"1.1rem"} paddingX="1"
            onClick={()=>onSelectGenre(g.slug)}>{g.name}</Button>
          </HStack>
        </List.Item>
      ))}
    </List.Root>
  )
}
const GenreAsMenu: FC<GenreListProps> = ({selectedGenre, genres, onSelectGenre}) => {
  const duration=0.7;
  const [isOpen, setIsOpen] =  useState<boolean>(false)
  return (
    <Menu.Root onExitComplete={() => setIsOpen(false)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" marginBottom={3} onClick={() => setIsOpen(!isOpen)}>
         { selectedGenre || "Genres"}
          {isOpen ? <MotionComponent duration={duration}>
            <FaChevronUp></FaChevronUp>
          </MotionComponent> :<FaChevronDown></FaChevronDown>}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MotionComponent duration={duration}>
            <Menu.Content>
            
              {genres.map(p => <Menu.Item key={p.id} value={p.slug}
               onClick={() => {onSelectGenre(p.slug); setIsOpen(false)}}>{p.name}</Menu.Item>)}
            </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
export type GenreComponentVariants = keyof typeof GanreRenderVariants;
interface Props {
  onSelectGenre: (genreSlug: string) => void;
  selectedGenre: string | null,
  componentType: GenreComponentVariants
}
function getSelectedStyls(slug: string, selectedGenre: string | null) : {fontWeight: string, color: string} {
     return slug === selectedGenre ? {fontWeight: "bold", color: "red"}: {fontWeight: "normal", color: "initial"}
}
const GanreRenderVariants = {
  list: GenreAsList,
  menu: GenreAsMenu
 } 
const GenreList: FC<Props> = ({onSelectGenre, selectedGenre, componentType}) => {
 const ComponentToRender = GanreRenderVariants[componentType];
 const {data: genres, error, isLoading} = useGenre();
 return  (
    <>
    {isLoading && <Spinner></Spinner>}
      {error? (
        <Text color="red" fontSize={"2.5rem"}>
          {error}
        </Text>
      ) : (
        <ComponentToRender genres={genres} onSelectGenre={onSelectGenre} selectedGenre={selectedGenre} />
      )}
    </>
  );
};

export default GenreList;
