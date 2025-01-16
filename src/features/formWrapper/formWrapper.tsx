import { FC } from "react";
import style from "./formWrapper.module.scss";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "./select.css";
import { useNavigate } from "react-router-dom";

interface IFormWrapper {
  title: string;
  buttonTitle: string;
  userOptions: IRoleOptions[] | undefined
}
type FormData = {
  lastName: string;
  birthday: string;
  gender: string;
  role: string;
};

export interface IRoleOptions {
  value: string;
  label: string;
}

export const FormWrapper: FC<IFormWrapper> = ({ title, buttonTitle, userOptions }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormData>({
      mode: "onBlur",
      defaultValues: {
        gender: "female",
      },
    });
  const onSubmit = handleSubmit((data) => console.log(data));
  const selectedGender = watch("gender", "female");
  const roleOptions: IRoleOptions[] = [
    { value: "doctor", label: "Доктор" },
    {
      value: "nurse",
      label: selectedGender === "female" ? "Медсестра" : "Медбрат",
    },
    { value: "admin", label: "Админ" },
  ];
const closePage = () => {
  navigate('/')
}
  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <header className={style.form__header}>
          <h1 className={style.form__header_title}>{title}</h1>
          <button className={style.form__header_close} onClick={closePage}>&#x2715;</button>
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

                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        className="select__control"
                        classNamePrefix="select"
                        {...field}
                        options={userOptions}
                        placeholder="Пользователь"
                        value={userOptions?.find(
                          (option) => option.value === field.value
                        ) || null}
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
            <div className={style.form__inputs_info}>
              <input
                className={style.form__birth}
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
                  {/* <img src="./img/female.png" alt="female" /> */}
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

                  {/* <img src="./img/male.png" alt="male" /> */}
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
                      className="select__control"
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
