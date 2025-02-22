import React from "react";
import UserAvatar from "@assets/userAvatar.svg";
import styles from "./UserMenu.module.scss";

interface UserMenuProps {
  isLoggedIn: boolean;
  userName?: string;
  userAvatar?: string;
  onSignIn: () => void;
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isLoggedIn,
  userName,
  userAvatar,
  onSignIn,
  onSignOut,
}) => {
  return (
    <div className={styles.userMenu}>
      {isLoggedIn ? (
        <>
          <button
            type="button"
            onClick={onSignOut}
            className={`${styles.button} ${styles["button--signIn"]}`}
          >
            Create article
          </button>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userName}</span>
            <img
              src={userAvatar ?? UserAvatar}
              alt={`${userName}'s avatar`}
              className={styles.avatar}
            />
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className={`${styles.button} ${styles["button--signOut"]}`}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onSignIn}
            className={`${styles.button} ${styles["button--signIn"]}`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={onSignIn}
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
