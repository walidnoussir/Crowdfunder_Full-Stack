import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjects } from "../features/projects/projectsSlice";


function StatCard({ label, value, valueColor }) {
  return (
    <div
      style={{
        background: "#f0f0f0",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        flex: "1 1 calc(50% - 12px)",
        minWidth: "160px",
      }}
    >
      <span style={{ fontSize: "14px", color: "#555" }}>{label}</span>
      <span
        style={{
          fontSize: "36px",
          fontWeight: "700",
          color: valueColor || "#111",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Dashboard() {
  const dispatch = useDispatch();
  const { myProjects, isLoading, error } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getMyProjects());
  }, [dispatch]);

  // Calcul des stats
  const total = myProjects.length;
  const ouverts = myProjects.filter((p) => p.status === "open").length;
  const fermes = myProjects.filter((p) => p.status === "closed").length;
  const capitalTotal = myProjects.reduce(
    (sum, p) => sum +
      Number(p.initialInvestment || 0) +
      Number(p.targetAmount || 0),
    0
  );
  
  return (
    <div style={{ padding: "32px 40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
        Tableau de bord
      </h1>
      <p style={{ color: "#666", marginBottom: "32px" }}>Vue d'ensemble</p>

      {isLoading && <p style={{ color: "#888" }}>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <StatCard label="Total Projets" value={total} />
        <StatCard label="Projets Ouverts" value={ouverts} valueColor="#22c55e" />
        <StatCard label="Projets Fermés" value={fermes} />
        <StatCard label="capital total levé" value={`${capitalTotal}$`} valueColor="#6366f1" />
      </div>
    </div>
  );
}

export default Dashboard;