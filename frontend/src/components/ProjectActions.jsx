import { useNavigate, useParams } from "react-router-dom";
import { closeProject } from "../features/projects/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { invest } from "../features/projects/investmentSlice";
import toast from "react-hot-toast";

function ProjectActions({ project }) {
  const { user } = useSelector((state) => state.auth);
  const { isLoading: isInvesting, error } = useSelector(
    (state) => state.investment,
  );
  const { id: projectId } = useParams();

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
    if (!amount || Number(amount) <= 0) {
      return toast.error("Please enter a valid amount");
    }

    const resultAction = await dispatch(
      invest({
        projectId,
        amount,
      }),
    );

    if (invest.fulfilled.match(resultAction)) {
      toast.success("Investment created successfully");
      setAmount("");
    } else {
      toast.error(
        error ||
          resultAction.payload?.message ||
          resultAction.error?.message ||
          "Failed to invest",
      );
    }
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
            {isInvesting ? "Saving..." : "Invester"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectActions;
