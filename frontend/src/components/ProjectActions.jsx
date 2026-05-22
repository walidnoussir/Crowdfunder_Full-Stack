import { useNavigate } from "react-router-dom";
import { closeProject } from "../features/projects/projectsSlice";
import { useDispatch } from "react-redux";

function ProjectActions({ project }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = project.status === "open";

  const handleClose = async () => {
    await dispatch(closeProject(project._id));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate(`/home/projects/${project._id}/edit`)}
        className="flex-1 py-2 text-sm font-medium transition-colors"
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-card)",
          color: "var(--color-text)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        Modifier
      </button>

      {isOpen && (
        <button
          onClick={handleClose}
          className="flex-1 py-2 text-sm font-medium text-white"
          style={{
            backgroundColor: "var(--color-danger)",
            borderRadius: "var(--radius-card)",
          }}
        >
          Fermer
        </button>
      )}
    </div>
  );
}

export default ProjectActions;
