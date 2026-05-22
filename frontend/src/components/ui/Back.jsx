import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="m-4">
      <ArrowLeft color="#22c55e" size={40} />
    </button>
  );
}

export default Back;
