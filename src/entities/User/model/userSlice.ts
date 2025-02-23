import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentUser } from "@entities/User/model/types";

const initialState: CurrentUser | undefined = undefined;

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      if (state) {
        Object.assign(state, action.payload);
      }
    },
  },
});
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
