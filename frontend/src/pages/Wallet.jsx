import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBalance, getMe } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function Wallet() {
  const [balance, setBalance] = useState("");

  const {
    user,
    isLoading: loading,
    error,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(error);

  if (error) toast.error(error.message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!balance || Number(balance) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const result = await dispatch(addBalance(Number(balance)));

    if (addBalance.fulfilled.match(result)) {
      toast.success("Balance updated successfully");

      dispatch(getMe());

      setBalance("");
    } else {
      toast.error(result.payload || "Something went wrong");
    }
  };
  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface rounded-[var(--radius-card)] border border-border shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text">Add Balance</h2>
          <p className="text-text-light mt-1">Recharge your account wallet.</p>
        </div>

        {user?.balance !== null && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-text-light">Current Balance</p>
            <p className="text-2xl font-bold text-success">${user?.balance}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-text">
              Amount
            </label>

            <input
              type="number"
              min="1"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-lg border border-border bg-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Processing..." : "Add Balance"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Wallet;
