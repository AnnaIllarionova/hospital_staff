import { useNavigate } from "react-router-dom";
import { ModalWrapper } from "../../features/modal-wrapper/modalWrapper";
import style from "./modalStyles.module.scss";
import { FC } from "react";
import { useDeleteUserMutation } from "../../services/api";
import { useAppDispatch } from "../../services/store";
import { deleteAddedUser } from "../../services/slice";

interface IDeleteModal {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | null;
  userName: string | null;
}

export const DeleteModal: FC<IDeleteModal> = ({
  setIsModalActive,
  userId,
  userName,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteUser, {isLoading: IsDeleteLoading}] = useDeleteUserMutation();
  const handleDelete = () => {
    try {
      if (userId) {
        deleteUser(userId);
        dispatch(deleteAddedUser(userId));
        setIsModalActive(false);
      }
      navigate("/success");
    } catch (error) {
      if (error) {
        navigate("/error");
      }
    }
  };

  const handleCancel = () => {
    setIsModalActive(false);
    navigate("/");
  };

  return (
    <ModalWrapper setIsModalActive={setIsModalActive}>
      <img
        className={style.modal__img}
        src="./img/icon_delete.png"
        alt="delete"
      />
      <div className={style.modal__info}>
        <p className={style.modal__info_text}>
          Вы хотите удалить пользователя:
        </p>
        <h2 className={style.modal__info_heading}>{userName}</h2>
      </div>
      <div className={style.modal__buttons}>
        <button
          onClick={handleDelete}
          className={`${style.modal__buttons_button} ${style.modal__buttons_del}`}
          disabled={IsDeleteLoading}
        >
         {IsDeleteLoading ? 'Удаляем...' :'Удалить'}
        </button>
        <button
          onClick={handleCancel}
          className={`${style.modal__buttons_button} ${style.modal__buttons_cancel}`}
        >
          Отменить
        </button>
      </div>
    </ModalWrapper>
  );
};
