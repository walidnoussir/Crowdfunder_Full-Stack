import { Outlet } from "react-router-dom";
import SideBar from "../ui/SideBar";

function AppLayout() {
  return (
    <div className="flex">
      <SideBar />
      <main className="w-full overflay-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
