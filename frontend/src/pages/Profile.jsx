import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Shield, Wallet } from "lucide-react";
import { useEffect } from "react";
import { getMe } from "../features/auth/authSlice";
import Spinner from "../components/ui/Spinner";

function Profile() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(user);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, []);

  if (isLoading || !user) return <Spinner />;

  const roleColors = {
    projectOwner: { background: "#eef2ff", color: "var(--color-primary)" },
    investor: { background: "#f0fdf4", color: "var(--color-success)" },
    admin: { background: "#fef3c7", color: "var(--color-warning)" },
  };

  const infos = [
    { icon: <User size={18} />, label: "Name", value: user.name },
    { icon: <Mail size={18} />, label: "Email", value: user.email },
    { icon: <Shield size={18} />, label: "Role", value: user.role },
    {
      icon: <Wallet size={18} />,
      label: "Balance",
      value: `$${user.balance.toFixed(2)}`,
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="w-full max-w-md p-8 shadow-sm"
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-3"
            style={{
              backgroundColor: "#eef2ff",
              color: "var(--color-primary)",
            }}
          >
            {user.name[0].toUpperCase()}
          </div>

          <h1
            className="text-xl font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {user.name}
          </h1>

          <span
            className="mt-2 text-xs font-medium px-3 py-1 rounded-full"
            style={
              roleColors[user.role] || {
                background: "var(--color-border)",
                color: "var(--color-text-light)",
              }
            }
          >
            {user.role}
          </span>
        </div>

        {/* Info Rows */}
        <div className="space-y-3">
          {infos.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 px-4 py-3"
              style={{
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span style={{ color: "var(--color-primary)" }}>{icon}</span>
              <div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {label}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
