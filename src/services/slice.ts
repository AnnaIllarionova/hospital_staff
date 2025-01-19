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
  sortedListByGender: [],
  sortedListByBirth: [],
  currentUser: null,
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
        avatar: action.payload.user!.avatar,
        userName: action.payload.form.lastName,
        email: action.payload.user!.email,
        birthday: action.payload.form.birthday,
        gender: action.payload.form.gender,
        role: action.payload.form.role,
        id: action.payload.user!.id,
      };
      state.addedList = [...state.addedList, addedUser];
    },
    getSortedAddedList: (state) => {
      state.sortedList = [...state.addedList].sort((a, b) =>
        a.userName.localeCompare(b.userName)
      );
    },
    getSortedByGender: (state) => {
      state.sortedList = [...state.addedList].sort((a, b) =>
        a.gender.localeCompare(b.gender)
      );
    },
    getSortedByDate: (state) => {
      state.sortedList = [...state.addedList].sort(
        (a, b) => Date.parse(a.birthday) - Date.parse(b.birthday)
      );
    },
    findCurrentUser: (state, action: PayloadAction<number>) => {
      state.currentUser = state.addedList.find(
        (user) => user.id === action.payload
      );
    },
    deleteAddedUser: (state, action: PayloadAction<number>) => {
      state.addedList = state.addedList.filter(
        (item) => item.id !== action.payload
      );
    },
    saveEditUser: (state, action: PayloadAction<IAddedInList>) => {
      const editedIndex: number | undefined = state.addedList.findIndex(
        (user) => user.id === action.payload.id
      );
      state.addedList[editedIndex].birthday = action.payload.form.birthday;
      state.addedList[editedIndex].gender = action.payload.form.gender;
      state.addedList[editedIndex].role = action.payload.form.role;
      state.addedList[editedIndex].userName = action.payload.form.lastName;
    },
  },
});

export const {
  getListOfUsers,
  addPersonInHospital,
  getSortedAddedList,
  deleteAddedUser,
  getSortedByDate,
  getSortedByGender,
  findCurrentUser,
  saveEditUser,
} = usersSlice.actions;
export default usersSlice.reducer;
