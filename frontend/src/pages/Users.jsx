import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import { useEffect, useState } from "react";
import { getUsersByRole } from "../features/admin/adminSlice";
import UserCard from "../components/UserCard";

import { Briefcase, Building2, Users as UsersIcon } from "lucide-react";

const ROLES = [
  { key: "investor", label: "Investors", icon: Briefcase },
  { key: "owner", label: "Owners", icon: Building2 },
];

function Users() {
  const { users, isLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [activeRole, setActiveRole] = useState("investor");

  useEffect(() => {
    dispatch(getUsersByRole(activeRole));
  }, [activeRole, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[--color-text]">
          Users Management
        </h1>
        <p className="text-sm text-[--color-text-light]">
          Manage investors and project owners
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {ROLES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveRole(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeRole === key
                ? "bg-[--color-primary] border-[--color-primary] text-white shadow-md scale-[1.02]"
                : "bg-[--color-surface] border-[--color-border] text-[--color-text-light] hover:border-[--color-primary] hover:text-[--color-primary]"
            }`}
          >
            <Icon size={16} />

            {label}

            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                activeRole === key
                  ? "bg-white/20"
                  : "bg-[--color-border] text-[--color-text-light]"
              }`}
            >
              {users?.length ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {users && users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-[--color-text-light]">
          <UsersIcon size={48} className="opacity-30 mb-3" />
          <p className="text-sm">No {activeRole}s found</p>
        </div>
      )}
    </div>
  );
}

export default Users;
