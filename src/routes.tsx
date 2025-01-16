import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/users";
import { NewUserPage } from "./pages/newUserPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/add" element={<NewUserPage />} />
    </Routes>
  );
};
