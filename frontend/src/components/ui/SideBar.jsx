import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import {
  CalendarPlus,
  FolderKanban,
  House,
  LogOut,
  UserRound,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function SideBar() {
  const links = [
    {
      path: "/home",
      icone: <House size={20} />,
      label: "Dashboard",
    },
    {
      path: "projects",
      icone: <FolderKanban size={20} />,
      label: "Projects",
    },
    {
      path: "create-project",
      icone: <CalendarPlus size={20} />,
      label: "Create Project",
    },
    {
      path: "me",
      icone: <UserRound size={20} />,
      label: "Profile",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-slate-900 w-55 px-4 py-4 text-gray-400">
      <div className="space-y-8">
        <Logo />
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <NavLink key={link.label} to={link.path} className="link" end>
              {link.icone}
              <li>{link.label}</li>
            </NavLink>
          ))}
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
