import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import { initialContent } from "../content";

export const STORAGE_KEY = "editorContent";

function App() {
  const [count, setCount] = useState(0);
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    return savedContent || initialContent;
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <Counter count={count} setCount={setCount} />
        </GridItem>
        <GridItem>
          <RichTextEditor
            content={content}
            setContent={setContent}
            hasUnsavedChanges={hasUnsavedChanges}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
