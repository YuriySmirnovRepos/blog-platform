import { useState, useEffect } from "react";
import { useLoginMutation } from "@entities/User/api/userApi";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<Error | undefined>(undefined);
  const [
    loginMutationTrigger,
    { isLoading, isSuccess, isError, error: loginError },
  ] = useLoginMutation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const login = (user: { email: string; password: string }) => {
    loginMutationTrigger(user)
      .unwrap()
      .then((newToken: string) => {
        localStorage.setItem("token", newToken);
        setIsLoggedIn(true);
        setToken(newToken);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken("");
  };

  return {
    isLoggedIn,
    token,
    error,
    login,
    logout,
  };
}

export default useAuth;
