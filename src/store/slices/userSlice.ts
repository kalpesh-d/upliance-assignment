import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const USER_STORAGE_KEY = "userData";

interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface UserState {
  data: UserData | null;
  hasUnsavedChanges: boolean;
  formData: Partial<UserData>;
  errors: Record<keyof UserData, string>;
}

const initialState: UserState = {
  data: localStorage.getItem(USER_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!)
    : null,
  hasUnsavedChanges: false,
  formData: {},
  errors: {
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  },
};

const validateFormData = (
  formData: Partial<UserData>
): Record<keyof UserData, string> => {
  const errors: Record<keyof UserData, string> = {
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  };

  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.phone?.trim()) {
    errors.phone = "Phone is required";
  }

  if (!formData.address?.trim()) {
    errors.address = "Address is required";
  }

  return errors;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof UserData; value: string }>
    ) => {
      state.formData[action.payload.field] = action.payload.value;
      state.hasUnsavedChanges = true;
      // Clear error when field is updated
      state.errors[action.payload.field] = "";
    },
    validateForm: (state) => {
      state.errors = validateFormData(state.formData);
    },
    saveUser: (state) => {
      const errors = validateFormData(state.formData);
      state.errors = errors;

      if (Object.values(errors).some((error) => error !== "")) {
        return;
      }

      const userId = state.data?.id || crypto.randomUUID();
      const userData: UserData = {
        id: userId,
        name: state.formData.name || "",
        address: state.formData.address || "",
        email: state.formData.email || "",
        phone: state.formData.phone || "",
      };
      state.data = userData;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      state.hasUnsavedChanges = false;
      state.formData = {};
      state.errors = { ...initialState.errors };
    },
    resetForm: (state) => {
      state.formData = {};
      state.hasUnsavedChanges = false;
      state.errors = { ...initialState.errors };
    },
  },
});

export const { updateFormField, saveUser, resetForm, validateForm } =
  userSlice.actions;
export default userSlice.reducer;
