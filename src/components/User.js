import { useEffect, useState } from "react";
import useAxiosPrivate from "../hook/useAxiosPrivate";

const User = () => {
  const [users, setUsers] = useState([]);
  const priveteAxios = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await priveteAxios.get("/users", {
          signal: controller.signal,
        });
        setUsers(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
    return () => {
      // cleanUp
      controller.abort();
    };
  }, []);

  return (
    <>
      <ul>
        {!users?.length ? (
          <h2>There is no to show</h2>
        ) : (
          users.map((user, ind) => {
            return <li key={ind}>{user?.username}</li>;
          })
        )}
      </ul>
      </>
    );
  };
  
  export default User;
  