import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";
import { Sidebar } from "./layout/sidebar";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen w-full">
      {isAuthenticated && <Sidebar />}
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto w-full">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
