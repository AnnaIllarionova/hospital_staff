import { FC } from "react";
import style from "./modalWrapper.module.scss";

interface IModalWrapper {
  children: React.ReactNode;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalWrapper: FC<IModalWrapper> = ({ children, setIsModalActive }) => {
  return (
    <div className={style.wrapper} onClick={()=> setIsModalActive(false)}>
      <div onClick={(e)=> e.stopPropagation()} className={style.container}>{children}</div>
    </div>
  );
};
