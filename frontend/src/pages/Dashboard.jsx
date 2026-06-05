import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyProjects,
  getOpenProjects,
} from "../features/projects/projectsSlice";
import { getMe } from "../features/auth/authSlice";
import { getMyInvestments } from "../features/projects/investmentSlice";
import { getDashboardStats } from "../features/admin/adminSlice";

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
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getMe());

    if (user?.role === "owner") {
      dispatch(getMyProjects());
    } else if (user?.role === "investor") {
      dispatch(getMyInvestments());
      dispatch(getOpenProjects());
    } else if (user?.role === "admin") {
      dispatch(getDashboardStats());
    }
  }, [dispatch, user?.role]);

  // =========================
  // ADMIN STATS
  // =========================
  console.log(stats);
  const adminStats = stats || {};

  // from API
  const totalInvestors = adminStats.stats?.totalInvestors || 0;
  const totalOwners = adminStats.stats?.totalOwners || 0;

  // activities
  const activities = adminStats.activities || [];

  // derived stats
  const totalInvested = activities.reduce((sum, a) => sum + (a.amount || 0), 0);

  const numberOfTransactions = activities.length;

  const uniqueInvestors = new Set(activities.map((a) => a.investor?._id)).size;

  const averageTransaction =
    numberOfTransactions > 0
      ? Math.round(totalInvested / numberOfTransactions)
      : 0;

  const biggestTransaction =
    activities.length > 0
      ? Math.max(...activities.map((a) => a.amount || 0))
      : 0;

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

  // const totalInvested = investments.reduce(
  //   (sum, inv) => sum + (inv.amount || 0),
  //   0,
  // );

  const numberOfInvestments = investments.length;

  const projectsSupported = new Set(
    investments.filter((inv) => inv.project).map((inv) => inv.project._id),
  ).size;

  const averageInvestment =
    numberOfInvestments > 0
      ? Math.round(totalInvested / numberOfInvestments)
      : 0;

  const activeInvestments = investments.filter(
    (inv) => inv.project?.status === "open",
  ).length;

  const closedInvestments = investments.filter(
    (inv) => inv.project?.status === "closed",
  ).length;

  const biggestInvestment =
    investments.length > 0
      ? Math.max(...investments.map((inv) => inv.amount || 0))
      : 0;

  const diversification =
    numberOfInvestments > 0
      ? Math.round((projectsSupported / numberOfInvestments) * 100)
      : 0;

  const portfolioValue = investments.reduce((sum, inv) => {
    if (!inv.project) return sum;

    const ratio =
      inv.project.targetCapital > 0
        ? inv.project.currentCapital / inv.project.targetCapital
        : 0;

    return sum + ratio * inv.amount;
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
              label="Projets soutenus"
              value={projectsSupported}
              valueColor="#6366f1"
            />

            <StatCard
              label="Investissements actifs"
              value={activeInvestments}
              valueColor="#22c55e"
            />

            <StatCard
              label="Projets clôturés"
              value={closedInvestments}
              valueColor="#ef4444"
            />

            <StatCard
              label="Investissement moyen"
              value={`${averageInvestment}$`}
              valueColor="#0ea5e9"
            />

            <StatCard
              label="Plus grand investissement"
              value={`${biggestInvestment}$`}
              valueColor="#f59e0b"
            />

            <StatCard
              label="Diversification"
              value={`${diversification}%`}
              valueColor="#8b5cf6"
            />

            <StatCard
              label="Valeur du portefeuille"
              value={`${Math.round(portfolioValue)}$`}
              valueColor="#f59e0b"
            />
          </>
        )}

        {/* ================= ADMIN ================= */}
        {user?.role === "admin" && (
          <>
            <StatCard
              label="Total Investors"
              value={totalInvestors}
              valueColor="#22c55e"
            />

            <StatCard
              label="Total Owners"
              value={totalOwners}
              valueColor="#6366f1"
            />

            <StatCard label="Total Transactions" value={numberOfTransactions} />

            <StatCard
              label="Total Invested"
              value={`${totalInvested}$`}
              valueColor="#22c55e"
            />

            <StatCard
              label="Unique Investors"
              value={uniqueInvestors}
              valueColor="#8b5cf6"
            />

            <StatCard
              label="Average Transaction"
              value={`${averageTransaction}$`}
              valueColor="#0ea5e9"
            />

            <StatCard
              label="Biggest Transaction"
              value={`${biggestTransaction}$`}
              valueColor="#f59e0b"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
