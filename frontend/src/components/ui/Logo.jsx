import { PanelsTopLeft } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <PanelsTopLeft color="oklch(72.3% 0.219 149.579)" />
      <p className="text-green-500 font-bold">Crowdfunder</p>
    </div>
  );
}

export default Logo;
