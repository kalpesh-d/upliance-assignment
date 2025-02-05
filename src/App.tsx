import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import { initialContent } from "../content";

function App() {
  const [count, setCount] = useState(0);
  const [content, setContent] = useState(initialContent);

  return (
    <Container>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <Counter count={count} setCount={setCount} />
        </GridItem>
        <GridItem>
          <RichTextEditor content={content} setContent={setContent} />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
