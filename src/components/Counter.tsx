import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { increment, decrement, setCount } from "../store/slices/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleReset = () => dispatch(setCount(0));

  // Calculate background color intensity based on count
  const backgroundColor = `rgba(130, 0, 219, ${Math.min(count * 0.1, 1)})`;

  return (
    <Box
      transition="background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
      backgroundColor={backgroundColor}
      borderColor="gray.200"
      alignItems="center"
      borderRadius="lg"
      borderWidth={1}
      height="100%"
      display="flex"
      rounded="2xl"
    >
      <Container>
        <VStack>
          <Flex direction="column" alignItems="center" my={5}>
            <Text fontSize="6xl" fontWeight="bold">
              {count}
            </Text>
            <Text>Counter</Text>
          </Flex>

          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Button onClick={handleDecrement} disabled={count === 0}>
              -
            </Button>
            <Button onClick={handleReset} disabled={count === 0}>
              Reset
            </Button>
            <Button onClick={handleIncrement}>+</Button>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Counter;
