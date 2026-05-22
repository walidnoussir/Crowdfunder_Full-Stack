import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectById } from "../features/projects/projectsSlice";
import Spinner from "../components/ui/Spinner";
import ProjectStats from "../components/ProjectStats";
import ProjectActions from "../components/ProjectActions";

function ProjectDetail() {
  const { currentProject: project, isLoading } = useSelector(
    (state) => state.projects,
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProjectById(id));
  }, []);

  if (isLoading || !project) return <Spinner />;

  console.log(project);

  const isOpen = project.status === "open";

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="w-full max-w-xl mx-auto p-8 shadow-sm"
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-xl font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {project.title}
          </h1>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              backgroundColor: isOpen ? "#f0fdf4" : "#fef2f2",
              color: isOpen ? "var(--color-success)" : "var(--color-danger)",
            }}
          >
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>

        <ProjectStats project={project} />
        <ProjectActions project={project} />
      </div>
    </div>
  );
}

export default ProjectDetail;
