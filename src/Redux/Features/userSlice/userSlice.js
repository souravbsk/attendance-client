import app from "@/Utils/firebase.init";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const createUser = createAsyncThunk(
  "users/createUserSignUp",
  async ({ email, password, image, fullName }) => {
    const auth = getAuth(app); // Initialize Auth
    const userRes = await createUserWithEmailAndPassword(auth, email, password);
    if (userRes?.user) {
      const updateProfileRes = await updateProfile(auth.currentUser, {
        photoURL: image,
        displayName: fullName,
      });

      const newUser = {
        email: userRes.user.email,
        displayName: userRes.user.displayName,
        photoURL: userRes.user.photoURL,
      };

      return newUser;
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/userSignUp",
  async ({ email, password }) => {
    const auth = getAuth(app); // Initialize Auth
    const userRes = await signInWithEmailAndPassword(auth, email, password);
    if (userRes.user) {
      const newUser = {
        email: userRes.user.email,
        displayName: userRes.user.displayName,
        photoURL: userRes.user.photoURL,
      };

      return newUser;
    }
  }
);

const initialState = {
  user: null,
  isLoading: true,
  isError: false,
  error: "",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setLogOut: () => {
      (state.user = null),
        (state.isLoading = false),
        (state.isError = false),
        (state.error = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        (state.user = null),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = "");
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        (state.user = payload),
          (state.isLoading = false),
          (state.isError = false),
          (state.error = "");
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.user = null),
          (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error.message);
      });

    builder
      .addCase(loginUser.pending, (state, action) => {
        (state.user = null),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = "");
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        (state.user = payload),
          (state.isLoading = false),
          (state.isError = false),
          (state.error = "");
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.user = null),
          (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error.message);
      });
  },
});

export const { setUser, setLoading, setLogOut } = userSlice.actions;

export default userSlice.reducer;
