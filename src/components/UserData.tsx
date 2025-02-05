import { Box, Stack, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateFormField } from "../store/slices/userSlice";
import { Field } from "./ui/field";
import SaveButton from "./SaveButton";

const UserData = () => {
  const dispatch = useDispatch();
  const { formData, data, errors } = useSelector(
    (state: RootState) => state.user
  );

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateFormField({ field: field as keyof typeof formData, value }));
  };

  return (
    <Box border="1px solid" borderColor="gray.300" borderRadius="2xl" p={10}>
      <Stack direction="column" gap={4}>
        <Text fontWeight="semibold">UserData:JSON object</Text>

        <Field
          invalid={!!errors.name}
          label="Name"
          errorText={errors.name || "This field is required"}
          required
        >
          <Input
            placeholder="Enter your name"
            variant="subtle"
            value={formData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Field>

        <Box border="1px solid" borderColor="gray.300" borderRadius="xl" p={3}>
          <Text color="gray.500">id: autogenerate for each user</Text>
          {data?.id && <Text mt={1}>{data.id}</Text>}
        </Box>

        <SaveButton />
      </Stack>
    </Box>
  );
};

export default UserData;
