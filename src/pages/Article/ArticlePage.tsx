import EditableArticleCard from "@widgets/ArticleCard/components/EditableArticleCard/EditableArticleCard";
import styles from "./ArticlePage.module.scss";

export default function ArticlePage() {
  return (
    <div className={styles.articlePage}>
      <EditableArticleCard />
    </div>
  );
}
