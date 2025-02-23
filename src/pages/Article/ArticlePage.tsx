import ArticleCard from "@widgets/ArticleCard/ArticleCard";
import { useLocation } from "react-router-dom";
import styles from "./ArticlePage.module.scss";

export default function ArticlePage() {
  const location = useLocation();
  return (
    <div className={styles.articlePage}>
      <ArticleCard isDetailed articleData={location.state.articleData} />
    </div>
  );
}
