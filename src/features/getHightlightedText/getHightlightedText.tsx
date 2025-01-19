import style from '../formWrapper/formWrapper.module.scss'

export const getHighlightedText = (lastName: string, searchValue: string) => {
    if (searchValue === "") return lastName;
    const regExp = new RegExp(searchValue, "ig");
    const matchValue = lastName.match(regExp);

    if (matchValue) {
      const matchedParts: string[] = lastName.split(regExp);
      return matchedParts.map((part, index, array) => {
        if (index < array.length - 1) {
          const text = matchValue!.shift();

          return (
            <span key={index}>
              {part}
              <span className={style.highlighted}>{text}</span>
            </span>
          );
        }
        return part;
      });
    } else {
      return lastName;
    }
  };