import { Outlet } from "react-router-dom";
import SideBar from "../ui/SideBar";

function AppLayout() {
  return (
    <div className="flex overflow-hidden">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
