import { useNavigate } from "react-router-dom";
import { ModalWrapper } from "../../features/modal-wrapper/modalWrapper";
import style from "./modalStyles.module.scss";

export const SuccessModal = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  return (
    <ModalWrapper setIsModalActive={() => {}}>
      <img
        className={style.modal__img}
        src="./img/icon_success.png"
        alt="done"
      />
      <h2 className={style.modal__info_heading}>Данные успешно сохранены</h2>
      <button
        onClick={handleClose}
        className={`${style.modal__buttons_button} ${style.modal__buttons_close}`}
      >
        Закрыть
      </button>
    </ModalWrapper>
  );
};
