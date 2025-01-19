import { FC, useCallback, useEffect, useRef, useState } from "react";
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
import { useGetAllStaffQuery, useGetUserQuery } from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getListOfUsers } from "../../services/slice";

export const FormWrapper: FC<IFormWrapper> = ({
  title,
  buttonTitle,
  saveFunction,
  isLoading,
  heading,
  userValue,
  birthValue,
  genderValue,
  roleValue,
}) => {
  const [userId, setUserId] = useState<number>();
  const [isBirthFocused, setIsBirthFocused] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const { data: userData } = useGetUserQuery(userId!, { skip: !userId });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addedList = useAppSelector((state) => state.usersSlice.addedList);
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
      gender: genderValue,
      lastName: userValue,
      birthday: birthValue,
      role: roleValue,
    },
  });

  const onSubmit = handleSubmit((dataForm) => {
    console.log('dataForm', dataForm);
    saveFunction({ dataForm: dataForm, userId: userId, userData: userData });
  });
  const selectedGender = watch("gender", genderValue);
  const roleOptions: IRoleOptions[] = [
    { value: "Доктор", label: "Доктор" },
    {
      value: selectedGender === "female" ? "Медсестра" : "Медбрат",
      label: selectedGender === "female" ? "Медсестра" : "Медбрат",
    },
    { value: "Админ", label: "Админ" },
  ];
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const { data: allUsers, error: allUsersError } = useGetAllStaffQuery(page, {
    skip: page > 2,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const listOfUsers = useAppSelector((state) => state.usersSlice.listOfUsers);

  const lastItemRef = useCallback((node: HTMLParagraphElement | null) => {
    if (observer.current !== null) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (allUsers) {
      dispatch(getListOfUsers(allUsers?.data));
    }
  }, [dispatch, allUsers]);

  if (allUsersError) {
    navigate("/error");
  }

  const usersOptions: IRoleOptions[] | undefined = listOfUsers?.map((user) => {
    const firstLetter = user.first_name.substring(0, 1) + ".";

    return {
      value: user.last_name,
      label: `${user.last_name} ${firstLetter}`,
      id: user.id,
    };
  });

  const users = usersOptions?.filter((user) =>
    user.value.toLowerCase().includes(searchValue.toLowerCase())
  );

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
              <h2 className={style.form__inputs_heading}>{heading}</h2>

              <Controller
                control={control}
                name="lastName"
                rules={{ required: true }}
                render={({ field }) => (
                  <div className={style.form__user}>
                    <img
                      className={style.form__user_img}
                      src="/img/search.png"
                      alt="user"
                    />
                    <input
                      {...field}
                      autoComplete="off"
                      type="text"
                      min='2025-01-01'
                      className={
                        !errors.lastName
                          ? style.form__name
                          : `${style.form__name} ${style.error}`
                      }
                      placeholder="Пользователь"
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        field.onChange(e);
                      }}
                      value={field.value}
                      onFocus={() => {
                        setIsOptionsVisible(true);
                      }}
                    />

                    {users && users?.length > 0 && isOptionsVisible ? (
                      <div className={style.list}>
                        <div className={style.list__box}>
                          {users?.map((option, index) => {
                            return (
                              <p
                                ref={
                                  index + 1 === users.length
                                    ? lastItemRef
                                    : null
                                }
                                className={
                                  addedList.some(
                                    (item) => item.id === option.id
                                  )
                                    ? `${style.list__box_item} ${style.disabled}`
                                    : style.list__box_item
                                }
                                key={option.value}
                                onClick={() => {
                                  if (
                                    addedList.some(
                                      (item) => item.id === option.id
                                    )
                                  ) {
                                    setValue("lastName", "");
                                    setSearchValue("");
                                    setIsOptionsVisible(false);
                                  } else {
                                    setValue("lastName", option.label);
                                    setSearchValue(option.label);
                                    setUserId(option.id!);
                                    setIsOptionsVisible(false);
                                  }
                                }}
                              >
                                {getHighlightedText(option.label)}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    ) : !users?.length && isOptionsVisible ? (
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
                            , проверьте правильность написания или создайте
                            нового!
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
                )}
              />
            </div>

            <div className={style.form__inputs_info}>
              <Controller
                control={control}
                name="birthday"
                rules={{ required: true }}
                render={({ field }) => (
                  <div className={style.form__container}>
                    <input
                      className={
                        errors.birthday
                          ? `${style.form__birth} ${style.error}`
                          : style.form__birth
                      }
                      type={!isBirthFocused && !field.value ? "text" : "date"}
                      {...field}
                      placeholder={
                        !isBirthFocused && !field.value ? "Дата рождения" : ""
                      }
                      onFocus={() => setIsBirthFocused(true)}
                      onBlur={() => {
                        setIsBirthFocused(false);
                        field.onBlur();
                      }}
                    />
                    {!isBirthFocused && !field.value ? (
                      <img
                        src="./img/calendar.png"
                        alt="calendar"
                        className={style.form__birth_span}
                      />
                    ) : null}
                  </div>
                )}
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
                render={({ field, fieldState: { error } }) => {
                  return (
                    <>
                      <Select
                        className="select__control"
                        classNamePrefix="select"
                        {...field}
                        isSearchable={false}
                        options={roleOptions}
                        placeholder="Роль"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: error
                              ? "#FFE9E5 !important"
                              : "#f2f4f7 !important",
                          }),
                        }}
                        value={roleOptions!.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : null
                          )
                        }
                      />
                      {errors && <p>{errors.role?.message}</p>}
                    </>
                  );
                }}
              />
            </div>
          </div>
          <div className={style.form__buttons}>
            <button
              className={
                isLoading ||
                errors.lastName !== undefined ||
                errors.birthday !== undefined ||
                errors.role !== undefined
                  ? `${style.form__buttons_button} ${style.form__buttons_add} ${style.disabled}`
                  : `${style.form__buttons_button} ${style.form__buttons_add}`
              }
              type="submit"
              disabled={
                isLoading ||
                errors.lastName !== undefined ||
                errors.birthday !== undefined ||
                errors.role !== undefined
              }
            >
              {isLoading ? "Подождите..." : buttonTitle}
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
