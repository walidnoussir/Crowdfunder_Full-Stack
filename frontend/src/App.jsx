import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import Profile from "./pages/Profile";
import ProjectDetail from "./pages/ProjectDetail";
import UpdateProject from "./pages/UpdateProject";
import AutrhRedirect from "./routes/AutrhRedirect";
import Wallet from "./pages/Wallet";
import Investments from "./pages/Investments";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AutrhRedirect>
                <Login />
              </AutrhRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <AutrhRedirect>
                <Register />
              </AutrhRedirect>
            }
          />
          <Route path="*" element={<PageNotFound />} />

          <Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route
                path="users"
                element={
                  <ProtectedRoute role="admin">
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route path="projects" element={<Projects />} />
              <Route
                path="wallets"
                element={
                  <ProtectedRoute role="investor">
                    <Wallet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="investments"
                element={
                  <ProtectedRoute role="investor">
                    <Investments />
                  </ProtectedRoute>
                }
              />
              <Route path="me" element={<Profile />} />
              <Route
                path="create-project"
                element={
                  <ProtectedRoute role="owner">
                    <CreateProject />
                  </ProtectedRoute>
                }
              />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="projects/:id/edit" element={<UpdateProject />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
          },
          success: {
            style: {
              background: "#22c55e",
            },
          },
          error: {
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </>
  );
}

export default App;
