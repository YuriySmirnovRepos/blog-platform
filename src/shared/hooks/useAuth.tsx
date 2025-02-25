import { useState, useEffect } from "react";

/**
 * A hook that returns an object with two properties:
 * - isLoggedIn, a boolean that is true if the user is logged in
 * - logout, a function that logs the user out
 *
 * The hook checks if there is a token stored in local storage when it mounts,
 * and if there is, sets isLoggedIn to true.
 *
 * The logout function removes the token from local storage and sets isLoggedIn to false.
 */
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    logout,
  };
}

export default useAuth;
