import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import UserMenu from "@widgets/UserMenu/UserMenu";
import { Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header>
        <Link to="/" className={styles.title}>
          Realworld Blog
        </Link>
        <UserMenu
          isLoggedIn={false}
          onSignIn={() => {}}
          onSignOut={() => {}}
          userName="George"
        />
      </header>
      <main className={styles.mainLayout}>
        <Outlet />
      </main>
    </>
  );
}
