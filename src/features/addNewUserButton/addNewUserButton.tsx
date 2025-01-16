import { useNavigate } from "react-router-dom";
import style from "./addNewUserButton.module.scss";

export const AddNewUserButton = () => {
  const navigate = useNavigate();

  const handleAddNewUser = () => {
    navigate("/add");
  };

  return (
    <button className={style.add__button} onClick={handleAddNewUser}>
      <div className={style.add__button_plus}>+</div>
      <p className={style.add__button_text}>Добавить нового пользователя</p>
    </button>
  );
};
