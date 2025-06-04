import "./App.css";
import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import Nav from "./components/Nav";
import GameGrid from "./components/GameGrid";

import SortSelector from "./components/SortSelector";

import GenreFilterList from "./components/GenreFilterList";
import GenreFilterMenu from "./components/GenreFilterMenu";
import PlatformFilterMenu from "./components/PlatformFilterMenu";
import useStore from "./data-managment/store";

function App() {
  const gameQuery = useStore(s=>s.gameQuery);
  console.log(gameQuery);
  return (
    <Grid
      templateAreas={{
        base: '"nav" "main" ',
        md: '"nav nav" "aside main"',
      }}
    >
      <GridItem area="nav">
        <Nav />
      </GridItem>
      <Stack hideBelow="md">
        <GridItem area="aside" paddingX="5">
          <GenreFilterList />
        </GridItem>
      </Stack>
      <GridItem area="main">
        <PlatformFilterMenu />
        <SortSelector />
        <Box display={["none", "inline", "none"]}>
          <GenreFilterMenu />
        </Box>
        <GameGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
