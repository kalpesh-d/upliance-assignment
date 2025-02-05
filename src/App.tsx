import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useTrail, animated } from "@react-spring/web";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import { RootState } from "./store/store";
import UserData from "./components/UserData";
import ContactDetails from "./components/ContactDetails";

// Animated version of GridItem
const AnimatedGridItem = animated(GridItem);

function App() {
  const editorHasUnsavedChanges = useSelector(
    (state: RootState) => state.editor.hasUnsavedChanges
  );
  const userHasUnsavedChanges = useSelector(
    (state: RootState) => state.user.hasUnsavedChanges
  );

  // Create a trail animation for multiple items
  const items = [
    { component: Counter },
    { component: RichTextEditor },
    { component: UserData },
    { component: ContactDetails },
  ];

  const trail = useTrail(items.length, {
    from: {
      opacity: 0,
      transform: "scale(0.95) translateY(10px)",
    },
    to: {
      opacity: 1,
      transform: "scale(1) translateY(0px)",
    },
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
      clamp: false,
      velocity: 0,
    },
  });

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
        {trail.map((style, index) => (
          <AnimatedGridItem key={index} style={style}>
            {React.createElement(items[index].component)}
          </AnimatedGridItem>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
