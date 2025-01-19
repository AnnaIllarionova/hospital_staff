import { useNavigate, useParams } from "react-router-dom";
import { FormWrapper } from "../../features/formWrapper/formWrapper";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { saveEditUser } from "../../services/slice";
import { IAddFunction } from "../../interfaces/interfaces";
import { useEditUserMutation } from "../../services/api";

export const EditUser = () => {
  const currentUserId = useParams();
  const currentId = Number(currentUserId.id);
  console.log(currentId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.usersSlice.currentUser);

  console.log(currentUser);
  const [editUser, {isLoading: isEditLoading }] = useEditUserMutation();

  const handleSave = ({ dataForm }: IAddFunction) => {
    try {
      if (currentId) {
        console.log(1);
        editUser(currentId);
      }

      if (dataForm) {
        dispatch(saveEditUser({form:dataForm, id: currentId}));
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
      title="Редактировать пользователя"
      buttonTitle="Сохранить"
      userValue={isEditLoading ? "Подождите" : currentUser?.userName}
      birthValue={currentUser?.birthday}
      roleValue={currentUser?.role}
      genderValue={currentUser?.gender}
      isLoading={isEditLoading}
      saveFunction={handleSave}
      heading=""
    />
  );
};
