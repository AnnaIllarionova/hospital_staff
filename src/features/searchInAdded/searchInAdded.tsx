import { FC } from "react";
import style from "./searchInAdded.module.scss";
import { ISearchInAdded } from "../../interfaces/interfaces";

export const SearchInAdded: FC<ISearchInAdded> = ({ setSearchText }) => {
  return (
    <div className={style.search}>
      <input
        className={style.search__input}
        placeholder="Поиск..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      <img className={style.search__img} src="/img/search.png" alt="search" />
    </div>
  );
};
