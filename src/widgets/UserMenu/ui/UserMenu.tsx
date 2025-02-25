import React from "react";
import styles from "./UserMenu.module.scss";
import User from "@entities/User";
import useAuth from "@shared/hooks/useAuth";
import UserAvatar from "@assets/userAvatar.svg";
import { NavLink } from "react-router-dom";
import { CurrentUser } from "@entities/User/model/types";

const UserMenu: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  //TODO: replace with actual user data
  const userPropsMockData: CurrentUser = {
    username: "John Doe",
    image: UserAvatar,
    email: "john@example.com",
    token: "123456",
  };

  return (
    <div className={styles.userMenu}>
      {isLoggedIn ? (
        <>
          <NavLink
            to={"/create-article"}
            className={`${styles.button} ${styles["button--signIn"]}`}
          >
            Create article
          </NavLink>

          <User user={userPropsMockData} variant="current" />

          <button
            type="button"
            onClick={logout}
            className={`${styles.button} ${styles["button--signOut"]}`}
          >
            Sign out
          </button>
        </>
      ) : (
        //not logged in
        <>
          <NavLink
            className={`${styles.button} ${styles["button--signIn"]}`}
            to="/sign-in"
          >
            Sign in
          </NavLink>
          <NavLink
            className={`${styles.button} ${styles["button--signUp"]}`}
            to="/sign-up"
          >
            Sign up
          </NavLink>
        </>
      )}
    </div>
  );
};

export default UserMenu;
