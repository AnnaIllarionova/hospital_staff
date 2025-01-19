import { useNavigate } from "react-router-dom";

export const SetNewUser = () => {
    const navigate = useNavigate()
  return (
    <div>
      <p>Страница разрабатывается...</p>
      <button onClick={() => navigate('/add')}>Вернуться назад</button>
    </div>
  );
};
