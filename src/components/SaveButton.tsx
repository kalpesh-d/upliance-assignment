import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { saveUser, validateForm } from "../store/slices/userSlice";
import { useState } from "react";
import { toaster } from "./ui/toaster";

const SaveButton = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { errors, formData } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(validateForm());
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      toaster.create({
        title: "Error",
        description: "Please fix all form errors before submitting",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if any required fields are empty
      const requiredFields = ["name", "email", "phone", "address"] as const;
      const emptyFields = requiredFields.filter(
        (field) => !formData[field]?.trim()
      );

      if (emptyFields.length > 0) {
        toaster.create({
          title: "Error",
          description: "Please fill in all required fields",
          type: "error",
        });
        return;
      }

      dispatch(saveUser());
      toaster.create({
        title: "Success",
        description: "User data saved successfully",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save user data",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      borderWidth="2px"
      borderColor="gray.300"
      disabled={isLoading}
      mt={4}
    >
      Save
    </Button>
  );
};

export default SaveButton;
