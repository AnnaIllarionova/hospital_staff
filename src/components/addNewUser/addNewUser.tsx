import { useEffect, useState } from "react";
import { useCallback, useRef } from "react";

import { useGetAllStaffQuery } from "../../services/api";
import { getListOfUsers } from "../../services/slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { IRoleOptions } from "../../interfaces/interfaces";
import { FormWrapper } from "../../features/formWrapper/formWrapper";

export const NewUser = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const { data: allUsers } = useGetAllStaffQuery(page, {skip: page > 2});

  const observer = useRef<IntersectionObserver | null>(null);
  const dispatch = useAppDispatch();
  const listOfUsers = useAppSelector((state) => state.usersSlice.listOfUsers);

  const lastItemRef = useCallback((node: HTMLParagraphElement | null) => {
    if (observer.current !== null) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
      
        }
      },
      {
        threshold: 0.1,
      }
    );
    if (node) observer.current.observe(node);
  }, []);
console.log(page);
  useEffect(() => {
    if (allUsers){
       dispatch(getListOfUsers(allUsers?.data));
      }
  }, [dispatch, allUsers]);
  console.log("allUsers", allUsers);

  console.log("list", listOfUsers);

  const usersOptions: IRoleOptions[] | undefined = listOfUsers?.map((user) => {
    const firstLetter = user.first_name.substring(0, 1) + ".";
  

    return {
      value: user.last_name,
      label: `${user.last_name} ${firstLetter}`,
      id: user.id,
    };
  });
  
  const filteredArray = usersOptions?.filter((user) =>
    user.value.toLowerCase().includes(searchValue.toLowerCase())
  );
  // console.log("filteredArray", filteredArray);

  // console.log("searchValue", searchValue);
  return (
    <FormWrapper
      title="Добавить нового пользователя"
      buttonTitle="Добавить"
      users={filteredArray}
      lastItemRef={lastItemRef}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};
