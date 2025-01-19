import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../features/formWrapper/formWrapper";
import { useAddUserMutation } from "../../services/api";
import { useAppDispatch } from "../../services/store";
import { addPersonInHospital } from "../../services/slice";
import { IAddFunction} from "../../interfaces/interfaces";

export const NewUser = () => {
  const [addUser, { isLoading: isAddLoading }] = useAddUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAdd = ({ userId, dataForm, userData }: IAddFunction) => {
    try {
      if (userId) {
        addUser(userId);
      }

      if (userData) {
        dispatch(addPersonInHospital({ form: dataForm, user: userData.data }));
      }
      navigate("/success");
    } catch (error) {
      console.log(error);
      if (error) {
        navigate("/error");
      }
    }
  };

  return (
    <FormWrapper
      title="Добавить нового пользователя"
      buttonTitle="Добавить"
      userValue=""
      birthValue=""
      roleValue=""
      genderValue="female"
      saveFunction={handleAdd}
      isLoading={isAddLoading}
      heading="Найти в списке"
    />
  );
};
