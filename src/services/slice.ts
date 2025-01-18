import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddedInList,
  IAddedPerson,
  IState,
  IUser,
} from "../interfaces/interfaces";

const initialState: IState = {
  listOfUsers: [],
  addedList: [],
  sortedList: [],
};

export const usersSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getListOfUsers: (state, action: PayloadAction<IUser[]>) => {
      const newUsers = action.payload.filter(
        (newUser) =>
          !state.listOfUsers.some(
            (existingUser) => existingUser.id === newUser.id
          )
      );
      state.listOfUsers = [...state.listOfUsers, ...newUsers];
    },
    addPersonInHospital: (state, action: PayloadAction<IAddedInList>) => {
      const addedUser: IAddedPerson = {
        avatar: action.payload.user.avatar,
        userName: action.payload.form.lastName,
        email: action.payload.user.email,
        birthday: action.payload.form.birthday,
        gender: action.payload.form.gender,
        role: action.payload.form.role,
        id: action.payload.user.id,
      };
      state.addedList = [...state.addedList, addedUser];
    },
    getSortedAddedList: (state) => {
      state.sortedList = state.addedList.sort((a, b) =>
        a.userName.localeCompare(b.userName)
      );
    },
    deleteAddedUser: (state, action: PayloadAction<number>) => {
      state.addedList = state.addedList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { getListOfUsers, addPersonInHospital, getSortedAddedList, deleteAddedUser } =
  usersSlice.actions;
export default usersSlice.reducer;
