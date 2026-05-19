import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { CalendarPlus, FolderKanban, House, LogOut } from "lucide-react";

function SideBar() {
  return (
    <div className="flex flex-col justify-between h-screen bg-slate-900 w-55 px-4 py-4 text-gray-400">
      <div className="space-y-8">
        <Logo />
        <ul className="flex flex-col gap-4">
          <NavLink to="/home" className="link" end>
            <House size={20} />
            <li>Dashboard</li>
          </NavLink>

          <NavLink to="projects" className="link">
            <FolderKanban size={20} />
            <li>Projects</li>
          </NavLink>

          <NavLink to="create-project" className="link">
            <CalendarPlus size={20} />
            <li>Create Project</li>
          </NavLink>
        </ul>
      </div>
      <button className="flex items-center gap-2.5">
        <span>Logout</span>
        <LogOut size={20} />
      </button>
    </div>
  );
}

export default SideBar;
