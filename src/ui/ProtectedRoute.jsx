import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { selectUsername } from "../components/User/slice/userSlice";

function ProtectedRoute() {
	const username = useSelector(selectUsername);
	const location = useLocation();

	if (!username) {
		return <Navigate to="/welcome" state={{ from: location }} replace />;
	}

	return <Outlet />;
}

export default ProtectedRoute;
