import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import { useEffect } from "react";
import { getMyInvestments } from "../features/projects/investmentSlice";
import { TrendingUp } from "lucide-react";

function Investments() {
  const {
    myInvestments: investments,
    isLoading,
    error,
  } = useSelector((state) => state.investment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInvestments());
  }, []);

  if (isLoading) return <Spinner />;

  console.log(investments);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-8">My Investments</h1>

        <div className="space-y-6">
          {investments.map((investment) => {
            const percentage = Math.round(
              (investment.project.currentCapital /
                investment.project.targetCapital) *
                100,
            );

            return (
              <div
                key={investment._id}
                className="bg-surface border border-border rounded-card p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-text">
                      {investment.project.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 text-success px-3 py-1 rounded-full text-sm font-medium">
                    <TrendingUp size={16} />
                    Invested
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-sm text-text-light mt-2">
                    {percentage}% funded
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-sm text-text-light">Your Investment</p>

                    <p className="text-lg font-bold text-success">
                      ${investment.amount}
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4">
                    <p className="text-sm text-text-light">Target Capital</p>

                    <p className="text-lg font-bold text-text">
                      ${investment.project?.targetCapital}
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4">
                    <p className="text-sm text-text-light">Raised Capital</p>

                    <p className="text-lg font-bold text-text">
                      ${investment.project?.currentCapital}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {investments.length === 0 && (
          <div className="bg-surface border border-border rounded-card p-12 text-center">
            <h3 className="text-xl font-semibold text-text mb-2">
              No investments yet
            </h3>

            <p className="text-text-light">
              Start investing in projects to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Investments;
