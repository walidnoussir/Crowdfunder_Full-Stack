import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
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
            <Route path="projects" element={<Projects />} />
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
  );
}

export default App;
