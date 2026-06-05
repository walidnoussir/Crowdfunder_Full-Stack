import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPortfolio } from "../features/admin/adminSlice";
import Spinner from "../components/ui/Spinner";

function UserPortfolio() {
  const { userPortfolio, isLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getUserPortfolio(id));
  }, []);

  if (isLoading) return <Spinner />;

  console.log(userPortfolio);

  return <div>userPorftolio</div>;
}

export default UserPortfolio;
