import { useNavigate } from "react-router-dom";
import { ModalWrapper } from "../../features/modal-wrapper/modalWrapper";
import style from "./modalStyles.module.scss";
import { FC } from "react";

interface IDeleteModal {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteModal: FC<IDeleteModal> = ({ setIsModalActive }) => {
  const navigate = useNavigate();

  const handleDelete = () => {};

  const handleCancel = () => {
    setIsModalActive(false)
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
        <h2 className={style.modal__info_heading}>
          Казимир Антонина Рикудович
        </h2>
      </div>
      <div className={style.modal__buttons}>
        <button
          onClick={handleDelete}
          className={`${style.modal__buttons_button} ${style.modal__buttons_del}`}
        >
          Удалить
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
