import { Container, Grid, GridItem } from "@chakra-ui/react";
import Counter from "./components/Counter";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem>
          <Counter count={count} setCount={setCount} />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
