function CircularProgress({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg
        className="rotate-[-90deg]"
        width="144"
        height="144"
        viewBox="0 0 144 144"
      >
        <circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="10"
        />
        <circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span
        className="absolute text-2xl font-bold"
        style={{ color: "var(--color-primary)" }}
      >
        {percentage}%
      </span>
    </div>
  );
}

export default CircularProgress;
