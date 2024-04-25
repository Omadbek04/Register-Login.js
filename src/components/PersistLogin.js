import { useEffect, useState } from "react";
import useRefreshToken from "../hook/useRefreshToken";
import useAuth from "../hook/useAuth";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    let isMounted = true;
    const verifyAccessToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    isMounted && !auth.accessToken ? verifyAccessToken() : setLoading(false);
    return () => (isMounted = false);
  }, []);
  return <>{loading ? <h1>Loading...</h1> : <Outlet />}</>;
};

export default PersistLogin;
