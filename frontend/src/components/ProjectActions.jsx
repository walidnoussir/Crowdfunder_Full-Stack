import { useNavigate, useParams } from "react-router-dom";
import { closeProject } from "../features/projects/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { invest } from "../features/projects/investmentSlice";

function ProjectActions({ project }) {
  const { user } = useSelector((state) => state.auth);
  const { isLoading: isInvesting } = useSelector((state) => state.investment);
  const { id: projectId } = useParams();
  console.log(isInvesting);

  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = project.status === "open";

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const handleClose = async () => {
    await dispatch(closeProject(project._id));
  };

  const handleInvest = async () => {
    await dispatch(invest({ projectId, amount }));
    setAmount("");
  };

  return (
    <div className="flex items-center gap-4">
      {user?.role === "owner" && (
        <button
          onClick={() => navigate(`/home/projects/${project._id}/edit`)}
          className="flex-1 py-2 text-sm font-medium transition-colors"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)",
            color: "var(--color-text)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          Modifier
        </button>
      )}

      {isOpen && user?.role === "owner" && (
        <button
          onClick={handleClose}
          className="flex-1 py-2 text-sm font-medium text-white"
          style={{
            backgroundColor: "var(--color-danger)",
            borderRadius: "var(--radius-card)",
          }}
        >
          Fermer
        </button>
      )}

      {user?.role === "investor" && (
        <div className="flex flex-col w-full gap-2.5">
          <input
            type="number"
            className="border-2 outline-none border-primary rounded-lg px-4 py-2 text-sm font-medium text-black"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleInvest}
            disabled={isInvesting}
            className="bg-primary rounded-lg flex-1 py-2 text-sm font-medium text-white disabled:cursor-not-allowed"
          >
            Inverster
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectActions;
