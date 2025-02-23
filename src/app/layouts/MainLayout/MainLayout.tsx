import { Outlet, Link } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import UserMenu from "@widgets/UserMenu/ui/UserMenu";

export default function MainLayout() {
  return (
    <>
      <header>
        <Link to="/" className={styles.title}>
          Realworld Blog
        </Link>
        <UserMenu />
      </header>
      <main className={styles.mainLayout}>
        <Outlet />
      </main>
    </>
  );
}
