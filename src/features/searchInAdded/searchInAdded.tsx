import style from "./searchInAdded.module.scss"

export const SearchInAdded = () => {
    return (
        <div className={style.search}>
            <input className={style.search__input} placeholder="Поиск..." />
            <img className={style.search__img} src="./img/search.png" alt="search" />
        </div>
    )
}