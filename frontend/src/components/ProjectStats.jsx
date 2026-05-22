import CircularProgress from "./ui/CircularProgress";

function ProjectStats({ project }) {
  const percentage = project.targetCapital
    ? Math.min(
        Math.round((project.currentCapital / project.targetCapital) * 100),
        100,
      )
    : 0;

  const stats = [
    { label: "Cible", value: `${project.targetCapital?.toLocaleString()}$` },
    { label: "Atteint", value: `${project.currentCapital?.toLocaleString()}$` },
    { label: "Investisseurs", value: project.investors?.length ?? 0 },
  ];

  return (
    <div
      className="flex items-center gap-8 p-5 mb-6"
      style={{
        backgroundColor: "var(--color-background)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
      }}
    >
      <CircularProgress percentage={percentage} />

      <div className="flex flex-col gap-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="text-sm"
              style={{ color: "var(--color-text-light)" }}
            >
              {label}:
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectStats;
