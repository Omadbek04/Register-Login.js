import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RequireAuth = ({roles}) => {
  const { auth } = useAuth();
  const location= useLocation()
  return (
    auth?.roles?.find(role => roles?.includes(role))
        ? <Outlet />
        : auth?.user
            ? <Navigate to="/unauthorized" state={{from:location}} replace/>
            : <Navigate to="/login" state={{from:location}} replace  />
);
};

export default RequireAuth;

/* import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
   return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
 
}

export default RequireAuth; */
