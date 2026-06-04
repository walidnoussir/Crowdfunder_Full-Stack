import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyProjects,
  getOpenProjects,
} from "../features/projects/projectsSlice";
import { getMe } from "../features/auth/authSlice";
import { getMyInvestments } from "../features/projects/investmentSlice";

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

  const { myProjects } = useSelector((state) => state.projects);
  const { myInvestments } = useSelector((state) => state.investment);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());

    if (user?.role === "owner") {
      dispatch(getMyProjects());
    } else if (user?.role === "investor") {
      dispatch(getMyInvestments());
      dispatch(getOpenProjects());
    }
  }, [dispatch, user?.role]);

  // =========================
  // OWNER STATS
  // =========================
  const total = myProjects.length;
  const ouverts = myProjects.filter((p) => p.status === "open").length;
  const fermes = myProjects.filter((p) => p.status === "closed").length;

  const capitalTotal = myProjects.reduce(
    (sum, p) => sum + (p.currentCapital || 0),
    0,
  );

  // =========================
  // INVESTOR STATS
  // =========================
  const investments = myInvestments || [];

  const totalInvested = investments.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0,
  );

  const numberOfInvestments = investments.length;

  // const activeInvestments = myProjects.length;

  const portfolioValue = myProjects.reduce((sum, project) => {
    // if (!project.targetCapital) return sum;

    const ratio =
      project.targetCapital > 0
        ? project.currentCapital / project.targetCapital
        : 0;

    return sum + ratio * project.currentCapital;
  }, 0);

  return (
    <div style={{ padding: "32px 40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
        Tableau de bord
      </h1>

      <p style={{ color: "#666", marginBottom: "32px" }}>Vue d'ensemble</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {/* ================= OWNER ================= */}
        {user?.role === "owner" && (
          <>
            <StatCard label="Total Projets" value={total} />
            <StatCard
              label="Projets Ouverts"
              value={ouverts}
              valueColor="#22c55e"
            />
            <StatCard label="Projets Fermés" value={fermes} />
            <StatCard
              label="Capital total levé"
              value={`${capitalTotal}$`}
              valueColor="#6366f1"
            />
          </>
        )}

        {/* ================= INVESTOR ================= */}
        {user?.role === "investor" && (
          <>
            <StatCard
              label="Total Investi"
              value={`${totalInvested}$`}
              valueColor="#22c55e"
            />

            <StatCard
              label="Nombre d'investissements"
              value={numberOfInvestments}
            />

            <StatCard
              label="Valeur du portefeuille"
              value={`${Math.round(portfolioValue)}$`}
              valueColor="#f59e0b"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
