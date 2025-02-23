import React from "react";
import styles from "./UserMenu.module.scss";
import User from "@entities/User";
import useAuth from "@shared/hooks/useAuth";
import { useGetMeQuery } from "@entities/User/api/userApi";
import Message from "@shared/ui/Message/Message";

const onCreateArticle = () => {};
const onSignUp = () => {};

const UserMenu: React.FC = () => {
  const { isLoggedIn, token, error: authError, login, logout } = useAuth();
  const {
    data,
    isLoading,
    error: getMeError,
  } = useGetMeQuery(token, {
    skip: !token,
  });

  if (authError || getMeError) {
    return <Message text={"Something went wrong. Auth error"} type="error" />;
  }

  return (
    <div className={styles.userMenu}>
      {isLoggedIn ? (
        <>
          <button
            type="button"
            onClick={onCreateArticle}
            className={`${styles.button} ${styles["button--signIn"]}`}
          >
            Create article
          </button>

          <User variant="current" user={data} />

          <button
            type="button"
            onClick={logout}
            className={`${styles.button} ${styles["button--signOut"]}`}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => login({ email: "test@test.com", password: "123" })}
            className={`${styles.button} ${styles["button--signIn"]}`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={onSignUp}
            className={`${styles.button} ${styles["button--signUp"]}`}
          >
            Sign up
          </button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
