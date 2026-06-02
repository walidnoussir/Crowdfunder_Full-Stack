import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import { useEffect } from "react";
import {
  getMyProjects,
  getOpenProjects,
} from "../features/projects/projectsSlice";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/auth/authSlice";

function Projects() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const { myProjects, openProjects, isLoading, error } = useSelector(
    (state) => state.projects,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());

    user?.role === "owner"
      ? dispatch(getMyProjects())
      : user?.role === "investor"
        ? dispatch(getOpenProjects())
        : null;
  }, [dispatch, user?.role]);

  if (isLoading) return <Spinner />;

  const projects =
    user?.role === "owner"
      ? myProjects
      : user?.role === "investor"
        ? openProjects
        : [];

  console.log(projects);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Mes Projets
        </h1>
        {user?.role === "owner" && (
          <button
            onClick={() => navigate("/home/create-project")}
            className="px-4 py-2 text-sm font-medium text-white"
            style={{
              backgroundColor: "var(--color-primary)",
              borderRadius: "var(--radius-card)",
            }}
          >
            + Nouveau
          </button>
        )}
      </div>

      {isLoading && (
        <p
          className="text-center mt-10"
          style={{ color: "var(--color-text-light)" }}
        >
          Loading...
        </p>
      )}
      {error && (
        <p
          className="text-center mt-10"
          style={{ color: "var(--color-danger)" }}
        >
          {error}
        </p>
      )}
      {!isLoading && projects.length === 0 && (
        <p
          className="text-center mt-10"
          style={{ color: "var(--color-text-light)" }}
        >
          No projects yet. Create your first one!
        </p>
      )}

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
