import { AddNewUserButton } from "../../features/addNewUserButton/addNewUserButton";
import { SearchInAdded } from "../../features/searchInAdded/searchInAdded";
import style from "./addedUsers.module.scss";
import { useState } from "react";
import { DeleteModal } from "../../pages/modals/deleteModal";

export const AddedUsers = () => {
  const [isDelModalActive, setIsDelModalActive] = useState(false);
  
  return (
    <>
      <div className={style.added}>
        <header className={style.added__header}>
          <h1 className={style.added__header_title}>
            Пользователи клиники{" "}
            <span className={style.added__header_span}>123 человека</span>
          </h1>
          <AddNewUserButton />
        </header>
        <div className={style.added__info}>
          <SearchInAdded />
          <div className={style.added__headings}>
            <div className={style.added__headings_box}>
              <p className={style.added__headings_text}>
                ФИО пользователя{" "}
                <span className={style.added__headings_span}>
                  По алфавиту А-Я
                </span>
              </p>
              <img src="./img/sort.png" alt="sort" />
            </div>
            <p className={style.added__headings_text}>Контактные данные</p>
            <p className={style.added__headings_text}>Дата рождения</p>
            <p className={style.added__headings_text}>Пол</p>
            <p className={style.added__headings_text}>Роль</p>
          </div>
        </div>
        <div className={style.added__users}>
          <div className={style.added__user}>
            <div className={style.added__user_info}>
              <img
                className={style.added__user_photo}
                src="./img/female_photo.png"
                alt="photo"
              />
              <p className={style.added__user_text}>
                Казимир Антонина Рикудович
              </p>
            </div>
            <p
              className={`${style.added__user_text} ${style.added__user_email}`}
            >
              mail@mail.ru
            </p>
            <p className={style.added__user_text}>24.10.1998</p>
            <div className={style.added__user_box}>
              <img
                className={style.added__user_icon}
                src="./img/female.png"
                alt="male_or_female"
              />
              <p className={style.added__user_text}>Женский</p>
            </div>
            <p className={style.added__user_text}>Медсестра</p>
            <div className={style.added__user_box}>
              <button className={style.added__user_button}>
                <img
                  className={style.added__user_edit}
                  src="./img/edit.png"
                  alt="edit"
                />
              </button>
              <button
                className={style.added__user_button}
                onClick={() => setIsDelModalActive(true)}
              >
                <img
                  className={style.added__user_delete}
                  src="./img/delete.png"
                  alt="delete"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDelModalActive && (
        <DeleteModal setIsModalActive={setIsDelModalActive} />
      )}
    </>
  );
};
