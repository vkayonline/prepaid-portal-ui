import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { ApplicationsPage } from "./features/applications/pages/ApplicationsPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { ProtectedRoute } from "./features/auth/components/protected-route";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
