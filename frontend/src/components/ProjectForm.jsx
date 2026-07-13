import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProjectForm({ submit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    initialInvestment: "",
    maxInvestorPercentage: 50,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(submit(formData));
    if (submit.fulfilled.match(result)) {
      navigate("/home/projects");
    }
  };
  return (
    <div
      className="w-full max-w-xl p-8 shadow-sm"
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h2
        className="text-xl font-semibold mb-6"
        style={{ color: "var(--color-text)" }}
      >
        Créer un projet
      </h2>

      {error && (
        <p
          className="text-sm mb-4 p-3 rounded-lg"
          style={{
            color: "var(--color-danger)",
            backgroundColor: "#fef2f2",
            borderRadius: "var(--radius-card)",
          }}
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-sm outline-none"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              color: "var(--color-text)",
              backgroundColor: "var(--color-background)",
            }}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 text-sm outline-none resize-none"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              color: "var(--color-text)",
              backgroundColor: "var(--color-background)",
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Capital Cible $
            </label>
            <div
              className="flex items-center px-3 py-2 gap-2"
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-card)",
                backgroundColor: "var(--color-background)",
              }}
            >
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                required
                className="w-full text-sm outline-none bg-transparent"
                style={{ color: "var(--color-text)" }}
              />
              <span style={{ color: "var(--color-text-light)" }}>$</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Investissement initial
            </label>
            <div
              className="flex items-center px-3 py-2 gap-2"
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-card)",
                backgroundColor: "var(--color-background)",
              }}
            >
              <input
                type="number"
                name="initialInvestment"
                value={formData.initialInvestment}
                onChange={handleChange}
                required
                className="w-full text-sm outline-none bg-transparent"
                style={{ color: "var(--color-text)" }}
              />
              <span style={{ color: "var(--color-text-light)" }}>$</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Pourcentage max par investisseur
            </label>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              {formData.maxInvestorPercentage}%
            </span>
          </div>
          <input
            type="range"
            name="maxInvestorPercentage"
            min="1"
            max="50"
            value={formData.maxInvestorPercentage}
            onChange={handleChange}
            className="w-full accent-indigo-600"
          />
          <div
            className="flex justify-between text-xs"
            style={{ color: "var(--color-text-light)" }}
          >
            <span>1%</span>
            <span>50%</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-white transition-colors"
            style={{
              backgroundColor: isLoading
                ? "var(--color-text-light)"
                : "var(--color-primary)",
              borderRadius: "var(--radius-card)",
            }}
          >
            {isLoading ? "Saving..." : "Sauvegarder"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
