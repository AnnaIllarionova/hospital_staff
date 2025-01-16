// import { useState } from "react";
import {
  FormWrapper,
  IRoleOptions,
} from "../../features/formWrapper/formWrapper";
import { useGetAllStaffQuery } from "../../services/api";

export const NewUser = () => {
  const { data: allUsers } = useGetAllStaffQuery(1);
  //   const [users, setUsers] = useState<IRoleOptions[]>();
  console.log("data", allUsers);
  const usersOptions: IRoleOptions[] | undefined = allUsers?.data.map((user) => {
    const firstLetter = user.first_name.substring(0,1) + '.'

    return ({
    value: user.last_name,
    label: `${user.last_name} ${firstLetter}`,
  })});
  console.log(usersOptions);
  return (
    <FormWrapper
      title="Добавить нового пользователя"
      buttonTitle="Добавить"
      userOptions={usersOptions}
    />
  );
};
