import { AddNewUserButton } from "../../features/addNewUserButton/addNewUserButton";
import { SearchInAdded } from "../../features/searchInAdded/searchInAdded";
import style from "./addedUsers.module.scss";
import { useEffect, useState } from "react";
import { DeleteModal } from "../../pages/modals/deleteModal";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { IAddedPerson } from "../../interfaces/interfaces";
import { getSortedAddedList } from "../../services/slice";

export const AddedUsers = () => {
  const [isDelModalActive, setIsDelModalActive] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const addedList = useAppSelector((state) => state.usersSlice.addedList);
  const sortedList = useAppSelector((state) => state.usersSlice.sortedList);
  const [listOfAdded, setListOfAdded] = useState<IAddedPerson[]>(addedList);
  const [userId, setUserId] = useState<number | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const dispatch = useAppDispatch();
  console.log("addedList", addedList);
  console.log("sortedList", sortedList);

  useEffect(() => {
    if (isSorted) {
      setListOfAdded(sortedList);
    } else {
      setListOfAdded(addedList);
    }
  }, [isSorted, sortedList, addedList]);

  const handleSortLastname = () => {
    setIsSorted(!isSorted);
    if (isSorted) {
      dispatch(getSortedAddedList());
    }
  };
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
                <span
                  onClick={handleSortLastname}
                  className={style.added__headings_span}
                >
                  {isSorted ? "По умолчанию" : "По алфавиту А-Я"}
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
        {listOfAdded.map((person) => (
          <div className={style.added__users} key={person.id}>
            <div className={style.added__user}>
              <div className={style.added__user_info}>
                <img
                  className={style.added__user_photo}
                  src={person.avatar ? person.avatar : "./img/female_photo.png"}
                  alt="photo"
                />
                <p className={style.added__user_text}>{person.userName}</p>
              </div>
              <p
                className={`${style.added__user_text} ${style.added__user_email}`}
              >
                {person.email}
              </p>
              <p className={style.added__user_text}>{person.birthday}</p>
              <div className={style.added__user_box}>
                <img
                  className={style.added__user_icon}
                  src={
                    person.gender === "female"
                      ? "./img/female.png"
                      : "./img/male.png"
                  }
                  alt="male_or_female"
                />
                <p className={style.added__user_text}>
                  {person.gender === "female" ? "Женский" : "Мужской"}
                </p>
              </div>
              <p className={style.added__user_text}>{person.role}</p>
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
                  onClick={() =>{ 
                    setIsDelModalActive(true)
                    setUserId(person.id)
                    setUserName(person.userName)
                  }}
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
        ))}
      </div>

      {isDelModalActive && (
        <DeleteModal setIsModalActive={setIsDelModalActive} userId={userId} userName={userName} />
      )}
    </>
  );
};
