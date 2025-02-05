import { Box, Input, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateFormField } from "../store/slices/userSlice";
import { Field } from "./ui/field";
import SaveButton from "./SaveButton";

const ContactDetails = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector((state: RootState) => state.user);

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateFormField({ field: field as keyof typeof formData, value }));
  };

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="2xl"
      p={10}
      height="100%"
      width="full"
      gap={4}
    >
      <Stack direction="column" gap={4}>
        <Field
          invalid={!!errors.address}
          label="Address"
          errorText="This field is required"
          required
        >
          <Input
            placeholder="Enter your address"
            value={formData.address || ""}
            variant="subtle"
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </Field>

        <Field
          invalid={!!errors.email}
          label="Email"
          errorText="This field is required"
          required
        >
          <Input
            placeholder="Enter your email"
            value={formData.email || ""}
            variant="subtle"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Field>

        <Field
          invalid={!!errors.phone}
          label="Phone"
          errorText="This field is required"
          required
        >
          <Input
            placeholder="Enter your phone"
            value={formData.phone || ""}
            variant="subtle"
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </Field>
        <SaveButton />
      </Stack>
    </Box>
  );
};

export default ContactDetails;
