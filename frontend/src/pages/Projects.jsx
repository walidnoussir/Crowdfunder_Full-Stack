import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import { useEffect } from "react";
import { getMyProjects } from "../features/projects/projectsSlice";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";

function Projects() {
  const {
    myProjects: projects,
    isLoading,
    error,
  } = useSelector((state) => state.projects);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyProjects());
  }, []);

  if (isLoading) return <Spinner />;
  console.log(projects);
  console.log(error);

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
