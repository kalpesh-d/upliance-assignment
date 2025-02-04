import { Box, Button, Text, Stack, HStack } from "@chakra-ui/react";

const Counter = ({
  count,
  setCount,
}: {
  count: number;
  setCount: (count: number) => void;
}) => {
  return (
    <Box
      bg="white"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      p={6}
      maxW="sm"
      width="100%"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.600",
      }}
    >
      <Stack align="center">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="gray.800"
          _dark={{ color: "white" }}
        >
          {count}
        </Text>
        <Text fontSize="md" color="gray.600" _dark={{ color: "gray.400" }}>
          Counter
        </Text>
        <HStack>
          <Button
            colorScheme="red"
            size="md"
            onClick={() => setCount(count - 1)}
            aria-label="Decrease count"
          >
            -
          </Button>
          <Button
            colorScheme="gray"
            size="md"
            onClick={() => setCount(0)}
            aria-label="Reset count"
          >
            Reset
          </Button>
          <Button
            colorScheme="green"
            size="md"
            onClick={() => setCount(count + 1)}
            aria-label="Increase count"
          >
            +
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Counter;
