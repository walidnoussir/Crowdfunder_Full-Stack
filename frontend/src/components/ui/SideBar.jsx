import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import {
  CalendarPlus,
  CircleDollarSign,
  FolderKanban,
  House,
  LogOut,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-slate-900 w-55 px-4 py-4 text-gray-400">
      <div className="space-y-8">
        <Logo />

        <ul className="flex flex-col gap-4">
          <NavLink to="/home" end className="link">
            <li className="flex items-center gap-2">
              <House size={20} />
              Dashboard
            </li>
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/home/users" end className="link">
              <li className="flex items-center gap-2">
                <Users size={20} />
                Users
              </li>
            </NavLink>
          )}

          {user?.role === "owner" ||
            (user?.role === "investor" && (
              <NavLink to="/home/projects" className="link">
                <li className="flex items-center gap-2">
                  <FolderKanban size={20} />
                  Projects
                </li>
              </NavLink>
            ))}

          {user?.role === "investor" && (
            <NavLink to="/home/wallets" className="link">
              <li className="flex items-center gap-2">
                <Wallet size={20} />
                Wallet
              </li>
            </NavLink>
          )}

          {user?.role === "investor" && (
            <NavLink to="/home/investments" className="link">
              <li className="flex items-center gap-2">
                <CircleDollarSign size={20} />
                Investments
              </li>
            </NavLink>
          )}

          {user?.role === "owner" && (
            <NavLink to="/home/create-project" className="link">
              <li className="flex items-center gap-2">
                <CalendarPlus size={20} />
                Create Project
              </li>
            </NavLink>
          )}

          <NavLink to="/home/me" className="link">
            <li className="flex items-center gap-2">
              <UserRound size={20} />
              Profile
            </li>
          </NavLink>
        </ul>
      </div>

      <button className="flex items-center gap-2.5" onClick={handleLogout}>
        <span>Logout</span>
        <LogOut size={20} />
      </button>
    </div>
  );
}

export default SideBar;
