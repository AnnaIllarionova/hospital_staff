import { FC,useState } from "react";
import style from "./formWrapper.module.scss";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "./select.css";
import { useNavigate } from "react-router-dom";
import {
  FormData,
  IFormWrapper,
  IRoleOptions,
} from "../../interfaces/interfaces";
import { useGetUserQuery } from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { addPersonInHospital } from "../../services/slice";

export const FormWrapper: FC<IFormWrapper> = ({
  title,
  buttonTitle,
  lastItemRef,
  searchValue,
  setSearchValue,
  users,
}) => {
  const [userId, setUserId] = useState<number>();
  const { data: userData } = useGetUserQuery(userId!, { skip: !userId });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addedList = useAppSelector((state) => state.usersSlice.addedList);
  console.log(addedList);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      gender: "female",
    },
  });

  const onSubmit = handleSubmit((dataForm) => {
    try {
      if (userData) {
        dispatch(addPersonInHospital({ form: dataForm, user: userData.data }));
      }
      navigate("/success");
    } catch (error) {
      console.log(error);
      if (error) {
        navigate("/error");
      }
    }
  });
  const selectedGender = watch("gender", "female");
  const roleOptions: IRoleOptions[] = [
    { value: "Доктор", label: "Доктор" },
    {
      value: selectedGender === "female" ? "Медсестра" : "Медбрат",
      label: selectedGender === "female" ? "Медсестра" : "Медбрат",
    },
    { value: "Админ", label: "Админ" },
  ];
  const closePage = () => {
    navigate("/");
  };
  
  const getHighlightedText = (lastName: string) => {
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
  // console.log("users", users);

  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <header className={style.form__header}>
          <h1 className={style.form__header_title}>{title}</h1>
          <button className={style.form__header_close} onClick={closePage}>
            &#x2715;
          </button>
        </header>

        <form onSubmit={onSubmit} className={style.form__box}>
          <div className={style.form__inputs}>
            <div className={style.form__inputs_search}>
              <h2 className={style.form__inputs_heading}>Найти в списке</h2>
              <div className={style.form__user}>
                <img
                  className={style.form__user_img}
                  src="./img/search.png"
                  alt="user"
                />
                <label className={style.form__user_label} htmlFor=""></label>

                <input
                  type="text"
                  className={
                    !errors.lastName
                      ? style.form__name
                      : `${style.form__name} ${style.error}`
                  }
                  {...register("lastName", { required: true })}
                  placeholder="Пользователь"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />

                {users && users?.length > 0  ? (
                  <div className={style.list}>
                    <div className={style.list__box}>
                      {users?.map((option, index) => {
                        return (
                          <p
                            ref={
                              index + 1 === users.length ? lastItemRef : null
                            }
                            className={
                              addedList.some((item) => item.id === option.id)
                                ? `${style.list__box_item} ${style.disabled}`
                                : style.list__box_item
                            }
                            key={option.value}
                            onClick={() => {
                              if (addedList.some((item) => item.id === option.id)) {
                                setSearchValue('');
                              } else {
                                setSearchValue(option.label);
                                setUserId(option.id!);
                              }
                              
                            }}
                          >
                            {getHighlightedText(option.label)}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                ) : !users?.length ? (
                  <div className={style.list}>
                    <div className={style.list__box}>
                      <p
                        className={`${style.list__box_item} ${style.list__box_notfound}`}
                      >
                        Пользователя с такими параметрами
                        <span
                          className={`${style.list__box_item} ${style.list__box_span}`}
                        >
                          не найден
                        </span>
                        , проверьте правильность написания или создайте нового!
                      </p>
                      <div
                        className={`${style.list__box_item} ${style.list__add}`}
                      >
                        <img
                          className={style.list__add_img}
                          src="./img/add_user.png"
                          alt="add_user"
                        />
                        <p className={style.list__add_text}>
                          Добавить пользователя
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={style.form__inputs_info}>
              <input
                className={
                  errors.birthday
                    ? `${style.form__birth} ${style.error}`
                    : style.form__birth
                }
                type="date"
                {...register("birthday", { required: true })}
                placeholder="Дата рождения"
              />
              <div className={style.form__gender}>
                <div
                  onClick={() => setValue("gender", "female")}
                  className={style.form__gender_item}
                  style={{
                    backgroundColor:
                      selectedGender === "female" ? "#4DA2D6" : "",
                    color: selectedGender === "female" ? "#FFFFFF" : "",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5678 5.43219C9.92151 2.7859 5.63102 2.7859 2.98472 5.43219C0.338426 8.07849 0.338426 12.369 2.98472 15.0153C5.63102 17.6616 9.92151 17.6616 12.5678 15.0153C15.2141 12.369 15.2141 8.07849 12.5678 5.43219ZM12.5678 5.43219L16.7604 1.23959M12.2085 1L16.153 1C16.6208 1 17 1.37923 17 1.84703V5.79154"
                      stroke={
                        selectedGender === "female" ? "#FFFFFF" : "#42474D"
                      }
                      stroke-linecap="round"
                    />
                  </svg>

                  <p>Женский</p>
                </div>
                <div
                  onClick={() => setValue("gender", "male")}
                  className={style.form__gender_item}
                  style={{
                    backgroundColor: selectedGender === "male" ? "#4DA2D6" : "",
                    color: selectedGender === "male" ? "#FFFFFF" : "",
                  }}
                >
                  <svg
                    width="13"
                    height="18"
                    viewBox="0 0 13 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="6.16699"
                      cy="6.50624"
                      rx="5.5"
                      ry="5.50624"
                      stroke={selectedGender === "male" ? "#FFFFFF" : "#42474D"}
                    />
                    <path
                      d="M6.16699 12.4114V16.9999"
                      stroke={selectedGender === "male" ? "#FFFFFF" : "#42474D"}
                      stroke-linecap="round"
                    />
                    <path
                      d="M4.33398 14.7656H8.00065"
                      stroke={selectedGender === "male" ? "#FFFFFF" : "#42474D"}
                      stroke-linecap="round"
                    />
                  </svg>

                  <p>Мужской</p>
                </div>
                <input
                  type="hidden"
                  {...register("gender", { required: true })}
                />
              </div>
              <Controller
                control={control}
                name="role"
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      className={
                        error ? "select__control error" : "select__control"
                      }
                      classNamePrefix="select"
                      {...field}
                      options={roleOptions}
                      placeholder="Роль"
                      value={roleOptions!.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value : null
                        )
                      }
                    />
                    {error && <p>{error.message}</p>}
                  </>
                )}
              />
            </div>
          </div>
          <div className={style.form__buttons}>
            <button
              className={`${style.form__buttons_button} ${style.form__buttons_add}`}
              type="submit"
            >
              {buttonTitle}
            </button>
            <button
              className={`${style.form__buttons_button} ${style.form__buttons_cancel}`}
              onClick={closePage}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
