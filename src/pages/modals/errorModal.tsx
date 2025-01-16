import { useNavigate } from "react-router-dom";
import { ModalWrapper } from "../../features/modal-wrapper/modalWrapper";
import style from "./modalStyles.module.scss";

export const ErrorModal = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  return (
    <ModalWrapper setIsModalActive={() => {}}>
      <div className={style.modal__error} >
        <img
          className={style.modal__error_img}
          src="./img/img_error.png"
          alt="error"
        />
        <h2 className={style.modal__info_heading}>
          Произошла ошибка на сервере
        </h2>
      </div>

      <button
        onClick={handleClose}
        className={`${style.modal__buttons_button} ${style.modal__buttons_error}`}
      >
        Вернутся к списку
      </button>
    </ModalWrapper>
  );
};
