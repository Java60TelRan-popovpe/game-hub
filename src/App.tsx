import "./App.css";
import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import Nav from "./components/Nav";
import GameGrid from "./components/GameGrid";
import { useState } from "react";
import GameQuery from "./model/GameQuery";
import SortSelector from "./components/SortSelector";
import MenuItem from "./model/MenuItem";
import GenreFilterMenu from "./components/GenreFilterMenu";
import PlatformFilterMenu from "./components/PlatformFilterMenu";
import GenreFilterComponent from "./components/GenreFilterList";

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>(
    {} as GameQuery
  );
  return (
    <Grid
      templateAreas={{
        base: '"nav" "main" ',
        md: '"nav nav" "aside main"',
      }}
    >
      <GridItem area="nav">
        <Nav
          onSubmitText={(text: string) => {
            console.log(text, "app comp");
            setGameQuery({ ...gameQuery, searchText: text });
          }}
        ></Nav>
      </GridItem>
      <Stack hideBelow="md">
        <GridItem area="aside" paddingX="5">
          <GenreFilterComponent
            selectedItem={gameQuery.genre || null}
            onSelect={(genre: MenuItem | null) =>
              setGameQuery({ ...gameQuery,  genre })
            }
            addShowAllItem={Boolean(gameQuery.genre?.slug)}
          />
        </GridItem>
      </Stack>
      <GridItem area="main">
        <PlatformFilterMenu
          onSelect={(platform) =>
            setGameQuery({ ...gameQuery, platform })
          }
          selectedItem={gameQuery.platform}
          addShowAllItem={Boolean(gameQuery.platform?.slug)}
        />
        <SortSelector
          onSelectOrdering={(option) =>
            setGameQuery({ ...gameQuery, ordering: option })
          }
          selectedOrdering={gameQuery.ordering}
        ></SortSelector>
        <Box display={["none", "inline", "none"]}>
          <GenreFilterMenu
            selectedItem={gameQuery.genre}
            onSelect={(genre: MenuItem | null) =>
              setGameQuery({ ...gameQuery, genre })
            }
            addShowAllItem={Boolean(gameQuery.genre?.slug)}
          />
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
