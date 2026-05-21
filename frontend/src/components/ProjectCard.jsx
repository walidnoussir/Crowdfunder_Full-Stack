import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const percentage = project.targetAmount
    ? Math.min(
        Math.round((project.raisedAmount / project.targetAmount) * 100),
        100,
      )
    : 0;

  const isOpen = project.status === "open";

  return (
    <div
      className="p-5 cursor-pointer transition-shadow hover:shadow-md"
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
      }}
      onClick={() => navigate(`/home/projects/${project._id}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          {project.title}
        </h2>

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

      <div
        className="w-full h-2 rounded-full mb-2"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <div
          className="h-2 rounded-full transition-all"
          style={{
            width: `${percentage}%`,
            backgroundColor: isOpen
              ? "var(--color-primary)"
              : "var(--color-text-light)",
          }}
        />
      </div>

      <p className="text-sm" style={{ color: "var(--color-text-light)" }}>
        <span style={{ color: "var(--color-text)", fontWeight: 600 }}>
          {project.raisedAmount?.toLocaleString()}$
        </span>
        {" / "}
        {project.targetAmount?.toLocaleString()}$ ({percentage}%)
      </p>
    </div>
  );
}

export default ProjectCard;
