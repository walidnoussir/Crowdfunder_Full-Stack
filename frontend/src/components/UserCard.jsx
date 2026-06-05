import { User, Mail, Wallet, Shield } from "lucide-react";

function UserCard({ user }) {
  const isOwner = user.role === "owner";

  const roleColors = {
    owner: { background: "#eef2ff", color: "var(--color-primary)" },
    investor: { background: "#f0fdf4", color: "var(--color-success)" },
    admin: { background: "#fef3c7", color: "var(--color-warning)" },
  };

  const infos = [
    { icon: <User size={16} />, label: "Name", value: user.name },
    { icon: <Mail size={16} />, label: "Email", value: user.email },
    { icon: <Shield size={16} />, label: "Role", value: user.role },
    {
      icon: <Wallet size={16} />,
      label: "Balance",
      value: `$${user.balance.toLocaleString()}`,
    },
  ];

  return (
    <div
      className="w-full p-6 shadow-sm hover:shadow-md transition-all duration-300"
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Avatar + header */}
      <div className="flex flex-col items-center mb-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-3"
          style={{
            backgroundColor:
              roleColors[user.role]?.background || "var(--color-background)",
            color: roleColors[user.role]?.color || "var(--color-text)",
          }}
        >
          {user.name[0].toUpperCase()}
        </div>

        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          {user.name}
        </h2>

        <span
          className="mt-2 text-xs font-medium px-3 py-1 rounded-full capitalize"
          style={{
            backgroundColor:
              roleColors[user.role]?.background || "var(--color-border)",
            color: roleColors[user.role]?.color || "var(--color-text-light)",
          }}
        >
          {user.role}
        </span>
      </div>

      {/* Info rows (same style as Profile page) */}
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
  );
}

export default UserCard;
