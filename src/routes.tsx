import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/users";
import { NewUserPage } from "./pages/newUserPage";
import { SuccessModal } from "./pages/modals/sucсessModal";
import { ErrorModal } from "./pages/modals/errorModal";
import { EditUserPage } from "./pages/editUserPage";
import { SetNewUser } from "./components/setNewUser/setNewUser";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/add" element={<NewUserPage />} />
      <Route path="/new" element={<SetNewUser />} />
      <Route path="/edit/:id" element={<EditUserPage />} />
      <Route path="/success" element={<SuccessModal />} />
      <Route path="/error" element={<ErrorModal />} />
    </Routes>
  );
};
