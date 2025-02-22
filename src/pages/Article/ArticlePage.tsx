import Article from "@entities/Article/ui/Article";
import { ArticleData } from "@entities/Article/model/types";
import { useLocation } from "react-router-dom";
import styles from "./ArticlePage.module.scss";

export default function ArticlePage() {
  const location = useLocation();
  return (
    <div className={styles.articlePage}>
      <Article isDetailed articleData={location.state.articleData} />
    </div>
  );
}
