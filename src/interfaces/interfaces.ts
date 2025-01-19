export interface IFormWrapper {
  title: string;
  buttonTitle: string;
  userValue: string | undefined;
  birthValue: string | undefined;
  roleValue: string | undefined;
  genderValue: string | undefined;
  saveFunction: ({ userId, dataForm, userData }: IAddFunction) => void;
  isLoading: boolean;
  heading: string;
}

export type FormData = {
  lastName: string;
  birthday: string;
  gender: string;
  role: string;
};

export interface IRoleOptions {
  value: string;
  label: string;
  id?: number;
}

export interface IUser {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface IUserData {
  data: IUser;
  support: {
    text: string;
    url: string;
  };
}

export interface IAllUsers {
  data: IUser[];
  page: number;
  per_page: number;
  support: {
    url: string;
    text: string;
  };
  total: number;
  total_pages: number;
}

export interface IAddedPerson {
  avatar: string;
  userName: string;
  email: string;
  birthday: string;
  gender: string;
  role: string;
  id: number;
}

export interface IState {
  listOfUsers: IUser[];
  addedList: IAddedPerson[];
  sortedList: IAddedPerson[];
  sortedListByGender: IAddedPerson[];
  sortedListByBirth: IAddedPerson[];
  currentUser: IAddedPerson | null | undefined;
}

export interface IAddedInList {
  user?: IUser;
  form: FormData;
  id?: number;
}

export interface IAddFunction {
  userId?: number | undefined;
  dataForm: FormData;
  userData?: IUserData | undefined;
}

export interface IPatch {
  lastName: string;
  birthday: string;
  gender: string;
  role: string;
  id: number;
}

export interface ISearchInAdded {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

