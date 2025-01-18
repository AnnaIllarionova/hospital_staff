export interface IFormWrapper {
  title: string;
  buttonTitle: string;
  users: IRoleOptions[] | undefined;
  lastItemRef: React.LegacyRef<HTMLParagraphElement> | null;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
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
    data: IUser
    support: {
        text: string
        url: string
    }
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
  avatar: string,
  userName: string
  email: string
  birthday: string
  gender: string
  role: string
  id: number
}

export interface IState {
  listOfUsers: IUser[];
  addedList: IAddedPerson[];
  sortedList: IAddedPerson[];
}

export interface IAddedInList {
    user: IUser
    form: FormData
}