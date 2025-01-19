import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/users";
import { NewUserPage } from "./pages/newUserPage";
import { SuccessModal } from "./pages/modals/sucсessModal";
import { ErrorModal } from "./pages/modals/errorModal";
import { EditUser } from "./components/editUser/editUser";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/add" element={<NewUserPage />} />
      <Route path="/edit/:id" element={<EditUser />} />
      <Route path="/success" element={<SuccessModal />} />
      <Route path="/error" element={<ErrorModal />} />

    </Routes>
  );
};
