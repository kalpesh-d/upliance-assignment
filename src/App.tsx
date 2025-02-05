import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import { RootState } from "./store/store";

function App() {
  const hasUnsavedChanges = useSelector(
    (state: RootState) => state.editor.hasUnsavedChanges
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <Container>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={6}>
        <GridItem>
          <Counter />
        </GridItem>
        <GridItem>
          <RichTextEditor />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
