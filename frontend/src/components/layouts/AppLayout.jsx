import { Outlet } from "react-router-dom";
import SideBar from "../ui/SideBar";

function AppLayout() {
  return (
    <div className="h-screen flex overflow-y-hidden">
      <SideBar />
      <main className="w-full overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
