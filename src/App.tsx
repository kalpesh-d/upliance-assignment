import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import { RootState } from "./store/store";
import UserData from "./components/UserData";
import ContactDetails from "./components/ContactDetails";

function App() {
  const editorHasUnsavedChanges = useSelector(
    (state: RootState) => state.editor.hasUnsavedChanges
  );
  const userHasUnsavedChanges = useSelector(
    (state: RootState) => state.user.hasUnsavedChanges
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (editorHasUnsavedChanges || userHasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [editorHasUnsavedChanges, userHasUnsavedChanges]);

  return (
    <Container maxW="container.xl" py={6}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Counter />
        </GridItem>
        <GridItem>
          <RichTextEditor />
        </GridItem>
        <GridItem>
          <UserData />
        </GridItem>
        <GridItem>
          <ContactDetails />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
